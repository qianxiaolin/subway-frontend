<template>
<el-scrollbar id="driving_way" height="400px">
    <p id='result'></p>
</el-scrollbar>


</template>

<script setup>

</script>

<style lang="less" scoped>
@media (min-width:992px) {
    #driving_way{
			position: fixed;
            top: 10px;
            left: 20px;
            width: 270px;
            height: 450px;
            background: #fff;
            box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
            border-radius: 7px;
			padding: 10px;
		}
		#result{
			width: 100%;
			height: 400px;
			z-index: 99;
		}
    
}

</style>