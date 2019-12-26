import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const identityTypes = {
  application: {
    name: 'application',
    value: 1,
  },
  user: {
    name: 'user',
    value: 2,
  },
};

export default new Vuex.Store({
  state: {
    identities: {
      user: [],
      application: [],
    },
    names: {},
    contracts: {},
    documents: {},
  },
  mutations: {
    addIdentity(state, { identity, type }) {
      state.identities[type.name].push(identity);
    },
    addName(state, { identity, name }) {
      const { id } = identity;
      const names = state.names[id] || [];
      state.names = {
        ...state.names,
        [id]: [
          ...names,
          name,
        ],
      };
    },
    addContract(state, { identity, contract }) {
      const { id } = identity;
      state.contracts = {
        ...state.contracts,
        [id]: contract,
      };
    },
  },
  actions: {
    async createIdentity({ commit }, type) {
      const identity = await new Promise((resolve) => {
        setTimeout(() => resolve({ id: `t_${type.name}_id_${Date.now()}`, type }), 2000);
      });
      commit('addIdentity', { identity, type });
    },
    async registerName({ commit }, { identity, name }) {
      await new Promise((resolve) => {
        setTimeout(() => resolve(name), 2000);
      });
      commit('addName', { identity, name });
    },
    async registerContract({ commit }, { identity, json }) {
      const contract = await new Promise((resolve) => {
        setTimeout(() => resolve(json), 2000);
      });
      commit('addContract', { identity, contract });
    },
  },
  getters: {
    identityLists(state) {
      const { identities } = state;
      return Object.keys(identityTypes).map(typeName => ({
        type: identityTypes[typeName],
        items: identities[typeName],
      }));
    },
    userIdentitiesWithNames(state) {
      const { user } = state.identities;
      return user.map(identity => ({
        ...identity,
        names: state.names[identity.id] || [],
      }));
    },
    applicationIdentitiesWithContracts(state) {
      const { application } = state.identities;
      return application.map(identity => ({
        ...identity,
        contract: state.contracts[identity.id],
      }));
    },
  },
  plugins: [createPersistedState()],
});
