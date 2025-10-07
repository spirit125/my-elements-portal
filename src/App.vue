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
      { id: 'ShowLtButton', label: 'ShowLtButton', src: 'http://localhost/test-my-elements-app/ShowAll' },
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
   console.log("contentUrl", newTabSrc);
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
            style="--el-header-padding: 0px; --el-footer-padding: 0px; height: 100%;">
        <span slot="header"><div class="lt-header full"><h1>my-element / App.vue</h1></div></span>
        <span slot="aside"><div class="lt-aside full">
          <lt-tree ref="treeRef" 
                :lt-model-layout="treeSource" @update:ltModelLayout="treeSource = $event.detail" 
                @lt-node-click="treeNodeClick" lt-default-expand-all="true"
                lt-insert-style="
.lt-tree .el-text {
    font-size: 18px;
}
          "></lt-tree>
        </div></span>
        <span slot="main"><div class="full" style="width:950px;">
            <lt-tabs ref="tabsRef" 
                :lt-model-layout="tabSource" @update:ltModelLayout="tabSource = $event.detail[0]" 
                :lt-model-active-name="tabActiveName" @update:ltModelActiveName="tabActiveName = $event.detail[0];"
                lt-type="border-card" 
                lt-tab-position="top"
                lt-insert-style="
.lt-tabs .el-tabs__content
{
  overflow: auto;
  width: 900px;
  height: 600px;
}
                "
                >
                <div slot="titleMain">
                    <div style="padding: 10px;">
                        全部
                    </div>
                </div>
                <div slot="main" style="height: 100%;">
                    <div style="height: 100%;padding: 10px;">
                        <iframe src="http://localhost/test-my-elements-app/ShowLtTable" style="width:100%; height:350%; border-style:none;"></iframe>
                    </div>
                </div>
            </lt-tabs>

        </div></span>
        <span slot="footer"><div class="lt-footer full"><p>Mouse position is at: {{ x }}, {{ y }}</p></div></span>
    </lt-container>
</template>

<style scoped>

</style>
