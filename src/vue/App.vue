<!--
  - Copyright 2019 SpinalCom - www.spinalcom.com
  -
  -  This file is part of SpinalCore.
  -
  -  Please read all of the following terms and conditions
  -  of the Free Software license Agreement ("Agreement")
  -  carefully.
  -
  -  This Agreement is a legally binding contract between
  -  the Licensee (as defined below) and SpinalCom that
  -  sets forth the terms and conditions that govern your
  -  use of the Program. By installing and/or using the
  -  Program, you agree to abide by all the terms and
  -  conditions stated or referenced herein.
  -
  -  If you do not agree to abide by these terms and
  -  conditions, do not demonstrate your acceptance and do
  -  not install or use the Program.
  -  You should have received a copy of the license along
  -  with this file. If not, see
  -  <http://resources.spinalcom.com/licenses.pdf>.
  -->

<template>
  <div class="plugin-graph-viewer">
    <div class="graph-manager-top-bar">
      <top-bar :buttons="topBarButton" class="graph-manager-top-tools-bar" />

      <input
        v-if="isSearchActive"
        v-model="searchText"
        placeholder="search name "
      />
      <spinal-icon-button
        v-else
        class="plugin-graph-viewer-refresh"
        icon="search"
        tool-tip="search graph"
        v-on:click="isSearchActive = true"
      />

      <spinal-icon-button
        class="plugin-graph-viewer-refresh"
        icon="refresh"
        tool-tip="refresh graph"
        v-on:click="refresh"
      />
    </div>

    <div class="graph-manager-body">
      <nodes-list
        class="graph-viewer"
        :active-nodes-id="activeNodesId"
        :contexts-id="displayNodes"
        :has-child-in-context="hasChildInContext"
        :nodes="nodes"
        :show-hide-bim-object="false"
        @click="onNodeSelected"
        @right-click=""
        @hide-bim-object="onHideBimObject"
      />
      <side-bar
        class="graph-manager-side-bar"
        :sideBarButtonLoading="sideBarButtonLoading"
        :buttons="sideBarButton"
        :option="selectedNode"
      />
    </div>
  </div>
</template>

<script>
function test() {
  const res = {};
  for (const arg of arguments) {
    Object.assign(res, arg);
  }
  return res;
}

import {
  NodeList,
  SideBar,
  SpinalIconButton,
  TopBar,
} from 'spinal-env-viewer-vue-components-lib';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'graph-manager',
  components: {
    SpinalIconButton,
    sideBar: SideBar,
    TopBar: TopBar,
    NodesList: NodeList,
  },
  data: function () {
    return {
      isSearchActive: false,
      searchText: '',
      displayNodes: [],
    };
  },
  computed: test(
    mapState([
      'topBarButton',
      'sideBarButton',
      'sideBarButtonLoading',
      'contextsId',
      'nodes',
      'activeNodesId',
      'selectedNode',
      'searchId',
      'nodes',
    ]),
    mapGetters(['arrayNode', 'getChildrenId', 'hasChildInContext']),
    {
      isV6: function () {
        return LMV_VIEWER_VERSION.includes('6');
      },
    }
  ),
  methods: {
    onNodeSelected: function (event) {
      this.$store
        .dispatch('onNodeSelected', event)
        .then()
        .catch((e) => console.error(e));
    },

    height: function () {
      return '100%';
    },

    onHideBimObject: function (event) {
      console.log('hide bim obj event', event);
    },

    refresh: function () {
      this.$store.commit('REFRESH');
    },
  },
  watch: {
    searchText: {
      handler: function (value) {
        this.$store.commit('SEARCH_TEXT', value);
        if (value.length === 0) {
          this.displayNodes = this.contextsId;
          this.isSearchActive = false;
        } else {
          this.displayNodes = this.searchId;
        }
      },
    },
    immediate: true,
  },
  mounted() {
    this.displayNodes = this.contextsId;
  },
};
</script>

<style>
.plugin-graph-viewer {
  overflow: hidden;
  width: 260px;
}

.plugin-graph-viewer * {
  margin: 0;
  box-sizing: border-box;
}

.graph-viewer {
  border-right: 1px solid rgba(128, 128, 128, 0.64);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.graph-manager-top-bar {
  display: flex;
  background-color: rgba(52, 52, 52, 0.85);
  border-bottom: 1px solid rgba(128, 128, 128, 0.64);
}

.graph-manager-side-bar {
  overflow-y: auto;
  overflow-x: hidden;
  background-color: rgba(52, 52, 52, 0.85);
  border-bottom: 1px solid rgba(128, 128, 128, 0.64);
}

.graph-manager-side-bar::-webkit-scrollbar {
  width: 2px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #121212;
}

.graph-manager-side-bar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.graph-manager-side-bar::-webkit-scrollbar-thumb {
  outline: 1px solid slategrey;
  background-color: #737374;
}

.graph-viewer::-webkit-scrollbar {
  width: 4px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #121212;
}

.graph-viewer::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.graph-viewer::-webkit-scrollbar-thumb {
  outline: 1px solid slategrey;
  background-color: #737374;
}

.plugin-graph-viewer-refresh {
  float: right;
  font-size: 2%;
}

.graph-manager-top-tools-bar {
  float: left;
  width: 98%;
  overflow: auto;
  display: flex;
}

.graph-manager-top-tools-bar::-webkit-scrollbar {
  height: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #121212;
}

.graph-manager-top-tools-bar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.graph-manager-top-tools-bar::-webkit-scrollbar-thumb {
  outline: 1px solid slategrey;
  background-color: #737374;
}

.graph-manager-body {
  display: flex;
  width: 100%;
  height: calc(100% - 41px);
}
</style>
