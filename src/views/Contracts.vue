<template>
  <v-container>
    <v-row v-if="applicationIdentitiesWithContracts.length">
      <v-col>
        <v-simple-table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Contract</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="identity in applicationIdentitiesWithContracts"
              :key="identity.id"
            >
              <td>{{ identity.id }}</td>
              <td>
                <v-btn text @click="() => openDialog(identity)">
                  {{ identity.contract ? 'view' : 'register' }}
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
          You must have Application Identity
          in order to register a Contract for it
        </v-alert>
      </v-col>
    </v-row>
    <v-dialog
        v-model="showJsonDialog"
        fullscreen hide-overlay transition="dialog-bottom-transition"
    >
      <v-card>
        <v-form @submit="submit">
          <v-toolbar color="primary">
            <v-btn icon @click="showJsonDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Contract for {{selectedIdentity.id}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="!selectedIdentity.contract">
              <v-btn
                text
                :loading="submitting"
                @click="submit"
              >
                submit
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
            <AceEditor
              ref="aceEditor"
              v-model="json"
              @init="aceEditorInit"
              lang="json"
              theme="clouds_midnight"
              width="100%"
              height="94vh"
            />
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AceEditor from 'vue2-ace-editor';
import 'brace/mode/json';
import 'brace/theme/clouds_midnight';

export default {
  components: { AceEditor },
  data() {
    return {
      showJsonDialog: false,
      submitting: false,
      selectedIdentity: {},
      json: '',
    };
  },
  computed: {
    ...mapGetters([
      'applicationIdentitiesWithContracts',
    ]),
  },
  methods: {
    ...mapActions(['registerContract']),
    setAceEditorReadonly() {
      const readonly = this.selectedIdentity.contract;
      if (this.$refs.aceEditor) {
        this.$refs.aceEditor.editor.setReadOnly(readonly);
      }
    },
    aceEditorInit() {
      this.setAceEditorReadonly();
    },
    openDialog(identity) {
      this.selectedIdentity = identity;
      this.json = identity.contract ? identity.contract : '';
      this.showJsonDialog = true;
      this.setAceEditorReadonly();
    },
    submit() {
      const { json, selectedIdentity } = this;
      this.submitting = true;
      this.registerContract({
        identity: selectedIdentity,
        json,
      }).then(() => {
        this.showJsonDialog = false;
      }).finally(() => {
        this.submitting = false;
      });
    },
  },
};
</script>

<style scoped>
  tr>td:last-child {
    width: 1%;
  }

  .ace_editor {
    font-size: 1rem;
  }
</style>
