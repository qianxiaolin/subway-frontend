<template>
    <div class="sidebar tail">
        <ul class="container">
            <li class="item">
                <el-icon :size="30">
                    <User />
                </el-icon>
                <span class="text">我的</span>
            </li>
            <li v-if="dropdownItemVisble" class="item" @click="onRouerChange('/map/weather')">
                <el-icon :size="30">
                    <PartlyCloudy />
                </el-icon>
                <span class="text">天气</span>
            </li>
            <li class="item" v-if="dropdownItemVisble">
                <el-icon :size="30">
                    <Van />
                </el-icon>
                <span class="text">公交</span>
            </li>
            <li class="item" v-if="dropdownItemVisble">
                <el-icon :size="30">
                    <Van />
                </el-icon>
                <span class="text">线路</span>
            </li>
            <li class="item last-item">
                <el-icon :size="30" @click="dropdownItemVisble = !dropdownItemVisble">
                    <ArrowDown v-if="!dropdownItemVisble" />
                    <ArrowUp v-else />
                </el-icon>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowUp, ArrowDown, Van, PartlyCloudy, User } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const dropdownItemVisble = ref(true)
const onRouerChange=(path)=>{
    router.push(path)
}
</script>

<style lang="less" scoped>
// 移动端
@media (max-width:768px) {
    .tail {
        height: 100%;
        width: 100%;
        padding: 0;

        .container {
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row-reverse;

            .item {
                width: 25%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .last-item {
                display: none;
            }

        }
    }
}

//pc端
@media (min-width:992px) {
    .sidebar {
        width: 100%;
        height: 100%;
        display: flex;
        padding: 0;
        margin: 0;
        background-color: red;
        .container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            padding: 0;
            margin: 0;
            .item {
                width: 50px;
                height: 50px;
                display: flex;
                flex-direction: column;
                border: 1px solid #dcdfe6;
                align-items: center;
                justify-content: center;
                background-color:#ffffff ;
                
                .item-text {
                    font-size: 6px;
                    text-align: center;
                }
            }
        }
    }
}
</style>