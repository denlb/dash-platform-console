<template>
  <v-container>
    <v-row v-if="userIdentitiesWithNames.length">
      <v-col>
        <v-simple-table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Names</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="identity in userIdentitiesWithNames"
              :key="identity.id"
            >
              <td>{{ identity.id }}</td>
              <td>{{ identity.names.join(', ') }}</td>
              <td>
                <v-btn icon @click="() => openDialog(identity)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-alert type="error">
          You must have User Identity
          in order to register a Domain Name for it
        </v-alert>
      </v-col>
    </v-row>
    <v-dialog
        v-model="showNameDialog"
        max-width="400px"
    >
      <v-card>
        <v-form @submit="submit">
          <v-card-title>
            {{ selectedIdentity.id }}
          </v-card-title>
          <v-card-text>
            <v-text-field counter v-model="name" label="Name" />
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="showNameDialog = false">close</v-btn>
            <v-spacer />
            <v-btn
              color="primary"
              type="submit"
              :loading="submitting"
            >
              Register
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      showNameDialog: false,
      submitting: false,
      selectedIdentity: {},
      name: '',
    };
  },
  computed: {
    ...mapGetters(['userIdentitiesWithNames']),
  },
  methods: {
    ...mapActions(['registerName']),
    openDialog(identity) {
      this.selectedIdentity = identity;
      this.name = '';
      this.showNameDialog = true;
    },
    submit(event) {
      event.preventDefault();
      const { name, selectedIdentity } = this;
      this.submitting = true;
      this.registerName({
        identity: selectedIdentity,
        name,
      }).then(() => {
        this.showNameDialog = false;
      }).finally(() => {
        this.submitting = false;
      });
    },
  },
};
</script>

<style scoped>
  tr>td:first-child {
    width: 1%;
  }
  tr>td:last-child {
    width: 1%;
  }
</style>
