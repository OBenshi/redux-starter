import configureStore from '../configureStore';
import {
  addBug,
  bugAdded,
  getUnresolvedBugs,
  resolveBug,
  loadBugs,
} from '../bugs';
import { apiCallBegan } from '../api';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('bugSlice', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugSlice = () => store.getState().entities.bugs;
  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  it('should add the bug to the store if its saved to the server', async () => {
    const bug = { description: 'a2121' };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost('/bugs').reply(200, savedBug);

    await store.dispatch(addBug(bug));

    expect(bugSlice().list).toContainEqual(savedBug);
  });

  it('should not add the bug to the store if its not saved to the server', async () => {
    const bug = { description: 'a2121' };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost('/bugs').reply(500);
    await store.dispatch(addBug(bug));
    expect(bugSlice().list).toHaveLength(0);
  });

  it('should mark bug as resolved in store if marked in server', async () => {
    fakeAxios.onPost('/bugs').reply(200, { id: 1 });
    fakeAxios.onPatch('/bugs/1').reply(200, { id: 1, resolved: true });

    await store.dispatch(addBug());
    await store.dispatch(resolveBug(1));

    expect(bugSlice().list[0].resolved).toBe(true);
  });
  it('should not mark bug as resolved in store if not marked in server', async () => {
    fakeAxios.onPost('/bugs').reply(200, { id: 1, resolved: false });
    fakeAxios.onPatch('/bugs/1').reply(500);

    await store.dispatch(addBug());
    await store.dispatch(resolveBug(1));

    expect(bugSlice().list[0].resolved).toBe(false);
  });
  describe('loading bugs', () => {
    describe('if the bug exists in the cache', () => {
      it('should not be fetched from the server again', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);
        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());
        expect(fakeAxios.history.get.length).toBe(1);
      });
    });
    describe('if the bug does not exists in the cache', () => {
      it('should be fetched from the server and put in the store', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);
        await store.dispatch(loadBugs());
        expect(bugSlice().list).toHaveLength(1);
      });
      describe('loading indicator', () => {
        it('should be true while fetching the bugs', () => {
          fakeAxios.onGet('/bugs').reply(() => {
            expect(bugSlice().loading).toBe(true);
            return [{ id: 1 }];
          });
          store.dispatch(loadBugs());
        });
        it('should be false after fetching the bugs', async () => {
          fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);
          await store.dispatch(loadBugs());
          expect(bugSlice().loading).toBe(false);
        });
        it('should be false if the server returns error', async () => {
          fakeAxios.onGet('/bugs').reply(500);
          await store.dispatch(loadBugs());
          expect(bugSlice().loading).toBe(false);
        });
      });
    });
  });
  describe('selectors', () => {
    it('should get unresolved bugs‚', () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2, resolved: false },
        { id: 3, resolved: false },
      ];

      const res = getUnresolvedBugs(state);

      expect(res).toHaveLength(2);
    });
  });
});
