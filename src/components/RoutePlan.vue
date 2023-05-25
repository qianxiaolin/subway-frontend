<template>
    <el-card class="route-container" v-loading="listRoute">
        <el-scrollbar  height="400px" class="scrollbar">
        <header>
            <!-- <p>{{listRoute[0].content }}到{{listRoute[1].content }}</p> -->
        </header>
        <main>
            <el-timeline>
                <el-timeline-item v-for="(activity, index) in listRoute" :key="index" :size="activity.size"
                     :type="activity.type" :hollow="activity.hollow">
                    {{ activity.content }}
                </el-timeline-item>
            </el-timeline>
        </main>
    </el-scrollbar>
    </el-card>
    
</template>


<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const listRoute = computed(() => {
    console.log(store.state.routeModule.route)
    return store.state.routeModule.route
})

</script>

<style lang="less" scoped>
.route-container {
    position: fixed;
    top: 50px;
    left: 30px;
    z-index: 99;
    width: 250px;
    height: 450px;
    // overflow-y: auto;
    box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
    border-radius: 7px;
    .scrollbar{
        display: flex;
        padding: 10px;
    }
}
</style>