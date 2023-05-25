<template>
    <header class="page-header">
        <div class="search-box">
            <el-input placeholder="地铁 公交 景点" v-model="searchInfo" />
            <el-button type="primary" :icon="Search" class="search-button" @click="onSearchTransport">查询</el-button>
        </div>
    </header>
    <main class="page-main">
        <div class="map-container" style="height: ;">
            <div v-if="'百度地图' == Form.engine" id="normal-map"></div>
            <div v-else-if="'地铁查' == Form.engine" id="subway-map"></div>
        </div>
        <el-card class="wayfind-box">
            <el-form label-width="60px" class="form"  >
                <el-form-item label="搜索引擎" label-width="85px">
                    <el-radio-group v-model="Form.engine" @change="onSerchChange" style="display: flex;">
                        <el-radio label="百度地图" />
                        <el-radio label="地铁查" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="城市">
                    <el-select placeholder="选择城市" @change="onCityChange" v-model="Form.city">
                        <el-option v-for="item in subwayCityData" :label="item.name" :value="item.name" :key="item.name" />
                    </el-select>
                </el-form-item>
                <el-form-item label="出发地">
                    <el-input class="setup"  placeholder="请输入出发地" v-model="Form.start"
                        @change="onStartChange"></el-input>
                </el-form-item>
                <el-form-item label="目的地">
                    <el-input class="" placeholder="请输入目的地" v-model="Form.end" @change="onEndChange"></el-input>
                </el-form-item>
                <!-- <div class="right item">
                    <el-icon :size="20">
                            <el-icon>
                                <Sort />
                            </el-icon>
                        </el-icon>
                </div> -->
                <el-form-item label="方案"  v-if="'百度地图' == Form.engine">
                    <el-select v-model="Form.plan">
                        <el-option value="0" label="推荐方案"></el-option>
                        <el-option value="1" label="最少时间"></el-option>
                        <el-option value="2" label="最少换乘"></el-option>
                        <el-option value="3" label="最少步行"></el-option>
                        <el-option value="4" label="不乘地铁"></el-option>
                        <el-option value='5' label="优先地铁"></el-option>
                    </el-select>
                </el-form-item>
                <footer class="form-footer">
                    <el-button type="primary" @click="onSearchRoute()">查询</el-button>
                </footer>
            </el-form>
        </el-card>
    </main>
    <footer class="page-foot">
        <SideBar></SideBar>
    </footer>
    <RouterView class="view-box"></RouterView>
</template>
  
<script setup>
import { ElMessage } from 'element-plus'
import { Sort } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router'
import { computed, onMounted, ref, reactive } from 'vue'
import SideBar from '../components/SideBar.vue';
import { useStore } from 'vuex'
import { getRoutePlan, getCityData } from '../api/request'


const router = useRouter()
let map = ref('')
let searchInfo = ref('')
var subway = ref('')
let subwayCityData = ref([])
const Form = reactive(
    {
        engine: '百度地图',
        city: "无锡",
        start: '',
        end: '',
        plan: '0'
    }
)
const subwaymap = () => {
    var city
    var list = BMapSub.SubwayCitiesList;
    for (var i = 0; i < list.length; i++) {
        if (list[i].name === Form.city) {
            city = list[i];
            break;
        }
    }
    subway.value = new BMapSub.Subway('subway-map', city.citycode)
    subway.value.setZoom(0.7);

    var zoomControl = new BMapSub.ZoomControl({
        anchor: BMAPSUB_ANCHOR_TOP_RIGHT,
        offset: new BMapSub.Size(400, 20)
    });
    subway.value.addControl(zoomControl);

}

const drawmap = () => {
    map.value = new BMapGL.Map("normal-map");
    map.value.enableScrollWheelZoom(true);
    var point = new BMapGL.Point(116.404, 39.915);  // 创建点坐标 
    map.value.centerAndZoom(point, 15);
    function myFun(result) {
        var cityName = result.name;
        map.value.setCenter(cityName);
    }
    var myCity = new BMapGL.LocalCity();
    myCity.get(myFun);
}
onMounted(drawmap)

const store = useStore()


const onSerchChange = (val) => {
    if (val == '百度地图') {
        drawmap()
    }
    else if (val == '地铁查') {
        subwaymap()
    }

}
const onCityChange = () => {
    map.value.centerAndZoom(Form.city, 12)
}
const onStartChange = (newValue) => {
    var myGeo = new BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(newValue, function (point) {
        if (point) {
            map.value.centerAndZoom(point, 16);
            map.value.addOverlay(new BMapGL.Marker(point, { title: '北京市海淀区上地10街' }))
        } else {
            alert('您选择的地址没有解析到结果！');
        }
        // var local = new BMapGL.LocalSearch(map.value, {
        //     renderOptions: { map: map.value, panel: "result" }
        // });
        // local.search(newValue);
    }, Form.city)
}
const onEndChange = (newValue) => {
    var myGeo = new BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(newValue, function (point) {
        if (point) {
            map.value.centerAndZoom(point, 16);
            map.value.addOverlay(new BMapGL.Marker(point, { title: '北京市海淀区上地10街' }))
        } else {
            alert('您选择的地址没有解析到结果！');
        }
        // var local = new BMapGL.LocalSearch(map.value, {
        //     renderOptions: { map: map.value, panel: "result" }
        // });
        // local.search(newValue);
    }, Form.city)
}

const cityData = async () => {
    const { data } = await getCityData()
    console.log(data.cities)
    subwayCityData.value = data.cities
}
cityData()
const onSearchRoute = (path) => {
    if(!(Form.start&&Form.end)){
        return  ElMessage.error('出发地或目的地不能为空')
    }
    else 
    if (Form.engine == '百度地图') {
        router.push('/map/baiduroute')
        var myGeo = new BMapGL.Geocoder();
        var start, end;
        myGeo.getPoint(Form.start, function (point) {
            if (point) {
                start = new BMapGL.Point(point.lng, point.lat);
            } else {
                alert('您选择的地址没有解析到结果！');
            }
        }, Form.city)
        myGeo.getPoint(Form.end, function (point) {
            if (point) {
                end = new BMapGL.Point(point.lng, point.lat);
                var routePolicy = [BMAP_TRANSIT_POLICY_RECOMMEND, BMAP_TRANSIT_POLICY_LEAST_TIME,
                    BMAP_TRANSIT_POLICY_LEAST_TRANSFER, BMAP_TRANSIT_POLICY_LEAST_WALKING,
                    BMAP_TRANSIT_POLICY_AVOID_SUBWAYS, BMAP_TRANSIT_POLICY_FIRST_SUBWAYS]
                var transit = new BMapGL.TransitRoute(map.value, {
                    renderOptions: { map: map.value, panel: 'result' },
                    policy: 1,
                })
                var i = Form.plan;
                search(start, end, routePolicy[i]);
                function search(start, end, route) {

                    transit.setPolicy(route);
                    transit.search(start, end);
                }

            } else {
                alert('您选择的地址没有解析到结果！');
            }
        }, Form.city)
    }
    else if (Form.engine == '地铁查') {
        var data = { 'start': Form.start, 'end': Form.end }
        router.push('/map/subwayroute').then(()=>{
            getRoutePlan(data).then((response) => {
            var data = response.data
            console.log(response, data)
            if (data) {
                store.commit('onListRoute', data.route)
               
                return
            }
            else if (data.code == 202) {
                return alert(data.message)
            }

        }).catch((error) => {
            //console.log(error)
        })
        })
        
    }
}
const onSearchTransport = () => {
    router.push('/map/transport').then(() => {
        var busline = new BMapGL.BusLineSearch(map.value, {
            renderOptions: { map: map.value, panel: "transport-info" },
            onGetBusListComplete: function (result) {
                if (result) {
                    console.log(result)
                    var fstLine = result.getBusListItem(0);//获取第一个公交列表显示到map上
                    busline.getBusLine(fstLine);
                }
            }
        });
        busSearch()
        function busSearch() {
            var busName = searchInfo.value;
            busline.getBusList(busName);
        }
    })

}


</script>
  
  


<style lang="less" scoped>
.el-header {
    padding: 0;
}

// 手机端
@media (max-width:768px) {
    .page-header {
        padding-top: 10px;
    }

    .search-box {
        width: 100%;
        display: flex;
        justify-content: flex-start;

        .search-button {
            height: 100%;
        }
    }

    .page-main {
        width: 100%;

        .map-container {
            height: 50vh;
            margin-bottom: 10px;
        }

        .wayfind-box {
            .ul-box {
                .head {
                    .model {
                        display: none;
                    }
                }

                .city-box {
                    display: none;
                }

                .map-box {
                    display: none;
                }
            }
        }


        .query-container {
            width: 100%;
            display: flex;
            flex-direction: column-reverse;

            .sidebar {
                margin-top: 10px;
                height: 10vh;
            }
        }
    }

    .el-footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
    }
}

//ipad端生效
@media (min-width:768px) and (max-width:992px) {
    .page-header {
        background-color: green;
    }

    .search-box {

        width: 100px;
        height: 40px;
        display: flex;

        .search-button {
            height: 100%;
        }
    }
}

// PC端生效
@media (min-width:992px) {
    .page-header {
        // float: left;
        width: 50%;
        position: absolute;
        top: 0;
        left: 25%;
        z-index: 1;
        display: flex;
        justify-content: center;

        .search-box {
            width: 50%;
            height: 30px;
            display: flex;
            justify-content: flex-start;

            .search-button {
                height: 100%;
            }
        }
    }

    .page-main {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        // background-color: red;
        display: flex;

        .map-container {
            // margin-left: 15%;
            width: 100%;
            height: 100%;
            z-index: 0;

            #normal-map {
                width: 100%;
                height: 100%;
            }

            #subway-map {
                width: 100%;
                height: 100%;
            }
        }

        .wayfind-box {
            height: 400px;
            width: 300px;
            position: absolute;
            top: 100px;
            right: 10px;
            background-color: #ffffff;
            .form{
                .form-footer{
                    display: flex;
                    justify-content: center;
                }
            }
        }
    }

    .page-foot {
        z-index: 99;
        position: absolute;
        background-color: red;
        top: 30px;
        right: 0;
    }

    
}
</style>
  
<style lang="less">
ul {
    margin: 0;
    padding: 0;

    li {
        list-style: none;
    }
}
</style>
  