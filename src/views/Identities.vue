<template>
  <v-container>
    <v-row>
      <v-col
        v-for="list in identityLists"
        :key="list.type.value"
      >
        <v-row class="mb-12">
          <v-col>
            <h1>{{ list.type.name }}</h1>
          </v-col>
          <v-col cols="auto">
            <v-btn
              fab dark color="primary"
              :loading="createIdentityLoading[list.type.name]"
              @click="() => createIdentity(list.type)"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-list shaped v-if="list.items.length">
          <v-list-item v-for="identity in list.items" :key="identity.id">
            <v-list-item-content>
              <v-list-item-title>
                {{ identity.id }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <span v-else>
          List is empty.
          Try to create an Identity
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      createIdentityLoading: {
        application: false,
        user: false,
      },
    };
  },
  computed: {
    ...mapGetters(['identityLists']),
  },
  methods: {
    createIdentity(type) {
      this.createIdentityLoading[type.name] = true;
      this.$store.dispatch('createIdentity', type).finally(() => {
        this.createIdentityLoading[type.name] = false;
      });
    },
  },

};
</script>
