<script setup>
import { ref, reactive, markRaw, defineAsyncComponent, useTemplateRef } from 'vue'
import { useMouse } from '@/assets/my-vue-composables.es'

const { x, y } = useMouse()
const treeRef = useTemplateRef('treeRef')
const tabsRef = useTemplateRef('tabsRef')
const treeSource = reactive([
  {
    id: 'app',
    label: 'App',
    children: [
      { id: 'ShowAll', label: 'ShowAll', src: 'http://localhost/test-my-elements-app/ShowAll' },
      { id: 'ShowLtButton', label: 'ShowLtButton', src: 'http://localhost/test-my-elements-app/ShowLtButton' },
      { id: 'ShowLtContainer', label: 'ShowLtContainer', src: 'http://localhost/test-my-elements-app/ShowLtContainer' },
      { id: 'ShowLtTable', label: 'ShowLtTable', src: 'http://localhost/test-my-elements-app/ShowLtTable' },
      { id: 'ShowLtTabs', label: 'ShowLtTabs', src: 'http://localhost/test-my-elements-app/ShowLtTabs' },
      { id: 'ShowLtTree', label: 'ShowLtTree', src: 'http://localhost/test-my-elements-app/ShowLtTree' },
    ],
  },
]);
const tabSource = reactive([
    {name:"main", titleSlot:"titleMain",contentSlot:"main"},
]);
const tabActiveName = ref();
const cssFile = import.meta.env.BASE_URL + 'css/portal-app.css'

const treeNodeClick = (event) => {
  let data = event.detail[0];
  //console.log(data);
  const newTabName = data['id'];
  const newTabSrc = data['src'];
  if (tabSource.find(t => t.name === newTabName)) {
    tabActiveName.value = newTabName;
    return; // 已存在相同名稱的標籤頁，直接切換到該標籤頁
  }
  const newTab = {name:newTabName, closable:true, title:data['label']};
  // // 動態載入元件
  // //import有些限制：https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
   //console.log("contentUrl", newTabSrc);
   newTab["contentUrl"] = newTabSrc;
   tabsRef.value.ltAddItem(newTab);
}

// const PageA = defineAsyncComponent(() =>
//   import('http://localhost/test-my-elements-app/Page1First.js')
// )
// const PageB = defineAsyncComponent(() =>
//   import('http://localhost/test-my-elements-app/Page2ShowAll.js')
// )

//const asyncComp = defineAsyncComponent(() => import('http://localhost/test-my-elements-app/my-pages.es.js'))
//const asyncComp = defineAsyncComponent(() => import('http://localhost/test-my-elements-app/index.js'))
//import { Page1First, Page2ShowAll, ShowLtButton } from 'http://localhost/test-my-elements-app/my-elements.es.js'
//import { Page1First, Page2ShowAll } from 'http://localhost/test-my-elements-app/my-elements.cjs.js'

//import { MyFooterElement } from './my-footer.js'

// import Page1First from 'http://localhost/test-my-elements-app/Page1First.js'
// import Page2Button from 'http://localhost/test-my-elements-app/Page2Button.js'
// import Page3ShowAll from 'http://localhost/test-my-elements-app/Page3ShowAll.js'

// const Page1First = defineAsyncComponent(() => import('http://localhost/test-my-elements-app/Page1First.js'))
 //const Page2Button = defineAsyncComponent(() => import('http://localhost/test-my-elements-app/Page2Button.js'))
// const Page3ShowAll = defineAsyncComponent(() => import('http://localhost/test-my-elements-app/Page3ShowAll.js'))
//const Page2Button = defineAsyncComponent(() => import('http://localhost/test-my-elements-app/assets/ShowLtButton-DxQZg4VQ.js'))

//import('http://localhost/test-my-elements-app/Page2Button.js').then(m => console.log('import', m))

const state1 = ref('')
const restaurants = ref([
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ])
const autocomplete_querySearch = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const autocomplete_handleSelect = (item) => {
  console.log(item)
}
const value1 = ref('')
const dialogOverflowVisible = ref(false)

</script>

<template>
  <!-- 畫面
  <div>
    <component :is="Page2Button" />
  </div> -->
  
                    <!-- <div style="height: 100%;">
                        <iframe src="http://localhost/test-my-elements-app/ShowLtTable" style="width:100%; height:100%;"></iframe>
                    </div> -->

    <lt-container lt-layout='[{ "Name" : "header" },{ "Name" : "div", "Child" : [{ "Name" : "aside", "Width": "200px" },{ "Name" : "div", "Child" : [{ "Name" : "main" },{ "Name" : "footer" }] }] }]'
            lt-slots='["aside","main","header","footer"]'
            :lt-insert-css-file="cssFile"
            style="--el-header-padding: 0px; --el-footer-padding: 0px;  display: flex; height: 100%; width: 100%;"
            >
        <span slot="header">
          <div class="lt-header row" style="margin: 10px"><h1>my-element / App.vue</h1>
              <el-autocomplete name="autocomplete"
                v-model="state1"
                :fetch-suggestions="autocomplete_querySearch"
                clearable
                style="width:500px"
                placeholder="Please Input"
                @select="autocomplete_handleSelect"
              />
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="Pick a day"
                size="large"
              />
              <el-button class="!ml-0" plain @click="dialogOverflowVisible = true">
                Open a overflow draggable Dialog
              </el-button>
            </div>
        </span>
        <span slot="aside"><div class="lt-aside full">
          <lt-tree ref="treeRef" 
                :lt-model-layout="treeSource" @update:ltModelLayout="treeSource = $event.detail" 
                @lt-node-click="treeNodeClick" lt-default-expand-all="true"
                :lt-insert-css-file="cssFile"
                lt-insert-style=""></lt-tree>
        </div></span>
        <span slot="main"><div class="full" style="width:100%;height:100%;">
            <lt-tabs ref="tabsRef" 
                :lt-model-layout="tabSource" @update:ltModelLayout="tabSource = $event.detail[0]" 
                :lt-model-active-name="tabActiveName" @update:ltModelActiveName="tabActiveName = $event.detail[0];"
                lt-type="border-card" 
                lt-tab-position="top"
                style="box-sizing: border-box; width: 100%; height: 100%;"
                >
                <div slot="titleMain">
                    <div style="padding:0px;">
                        全部
                    </div>
                </div>
                <div slot="main" style="height: 100%;">
                    <div style="height: 100%;">
                        <iframe src="http://localhost/test-my-elements-app/ShowAll" style="width:100%; height:100%; border-style:none;"></iframe>
                    </div>
                </div>
            </lt-tabs>

        </div></span>
        <span slot="footer"><div class="lt-footer full"><p>Mouse position is at: {{ x }}, {{ y }}</p></div></span>
    </lt-container>
  <el-dialog
    v-model="dialogOverflowVisible"
    title="Tips"
    width="500"
    align-center
    draggable
    overflow
  >
    <span>It's a overflow draggable Dialog</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogOverflowVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogOverflowVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
/* .el-header {
  --el-header-height:auto;
} */
.row {
  display: flex;          /* 啟用彈性排版 */
  align-items: center;    /* 垂直置中對齊 */
}

</style>
