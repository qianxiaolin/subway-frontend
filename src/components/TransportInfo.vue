<template>
    <el-scrollbar id="transport-info" class="container" height="400px">

    </el-scrollbar>
</template>

<script setup>

</script>

<style scoped lang="less">
#transport-info {
    position: fixed;
    top: 50px;
    left: 30px;
    z-index: 99;
    width: 250px;
    height: 450px;
    overflow-y: auto;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
    border-radius: 7px;
}
</style>