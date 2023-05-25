<template>
    <div class="weather-container">
        <el-cascader @change="onCityChange" :options="cityData" :props="{ checkStrictly: true }" clearable
            v-model="cityChoice"></el-cascader>
        <div class="main">
            <div class="now" style="color: #222;font-size: 10px;">
                <div class="location">
                    <el-icon :size="15">
                        <Location />
                    </el-icon>
                    <div class="province">{{ location.province }}</div>
                    <div class="city" v-if="location.province != location.city">{{ location.city }}</div>
                    <div class="name">{{ location.name }}</div>
                </div>
                <div class="weather">
                    <div class="tmp" v-if="nowWeather.temp">{{ nowWeather.temp }}°</div>
                    <div class="wet">{{ nowWeather.text }}</div>
                </div>
                <div class="detail">
                    <div class="wind">
                        <el-icon :size="15" style="margin-right: 5px;">
                            <Position />
                        </el-icon>
                        <span class="wind_dir">{{ nowWeather.wind_dir }}</span>
                        <span class="wind_class">{{ nowWeather.wind_class }}</span>
                    </div>
                    <div class="air">
                        <el-icon :size="15" style="margin-right: 5px;">
                            <Odometer />
                        </el-icon>
                        <span>相对湿度:{{ nowWeather.rh }}%</span>
                    </div>

                </div>

            </div>
            <div class="after">
                <div class="day" v-for="item in forecasts">
                    <div class="week">{{ item.week }}</div>
                    <!-- <div class="date">{{ item.date }}</div> -->
                    <div class="text_day" style="color:#53a8ff">{{ item.text_day }}</div>
                    <div class="temp_day" style="display: flex;height: 15px;align-items: center;">
                        <div class="left" style="height: 15px;margin-right: 5px;">
                            <!-- <el-icon :size="15">
                                <Odometer />
                            </el-icon> -->
                        </div>
                        <div class="right">
                            {{ item.low }}-{{ item.high }}度
                        </div>

                    </div>
                    <div class="wc_day" style="display: flex;height: 15px;align-items: center;"> 
                        <div class="left" style="height: 15px;margin-right: 5px;"></div>
                        <el-icon :size="15"><Position /></el-icon>
                        <div class="right" style="font-size: 10px;">
                            {{ item.wd_day }}{{ item.wc_day }}
                        </div>
                       </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getWeatherInfo, getWeatherCity } from '../api/request'
import { Location, Position, Odometer ,DCaret} from '@element-plus/icons-vue';
import { ref } from 'vue'
const cityData = ref()
const cityChoice = ref({ 0: '河北省', 1: '秦皇岛市', 2: '山海关' })
const nowWeather = ref('')
const location = ref('')
const forecasts = ref([])

const getCityCode = async () => {
    const res = await getWeatherCity()
    var data = res.data
    var floor_1 = []
    const pro_list = Object.keys(data)
    for (var i = 0; i < pro_list.length; i++) {
        var province = pro_list[i]
        var city_dict = data[province]

        const city_list = Object.keys(city_dict)
        var floor_2 = []
        for (var j = 0; j < city_list.length; j++) {
            var city = city_list[j]
            var county = city_dict[city]
            var floor_3 = []
            county.forEach(x => {
                floor_3.push({ value: x, label: x })
            })
            floor_2.push({ value: city, children: floor_3, label: city })
        }
        floor_1.push({ value: province, label: province, children: floor_2 })
    }
    cityData.value = floor_1

}
getCityCode()

const onCityChange = (Data) => {

    getWeatherInfo(cityChoice.value).then((res) => {
        if (res) {
            nowWeather.value = res.data.result.now
            location.value = res.data.result.location
            forecasts.value = res.data.result.forecasts
            console.log(forecasts.value)
        }
    }).catch()
}
onCityChange()
</script>

<style lang="less" scoped>
@media (min-width:992px) {
    .weather-container {
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

        .main {
            .now {
                display: flex;
                flex-direction: column;
                justify-content: center;

                .location {
                    display: flex;
                    // background-color: red;
                    justify-content: flex-start;
                    padding: 15px;

                    .province {
                        margin-right: 10px;
                    }
                }

                .weather {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    height: 110px;
                    width: 100%;

                    .tmp {
                        // width: 80px;
                        // height: 80px;
                        font-size: 80px;
                        float: left;
                        line-height: 110px;
                        color: #409EFF;
                    }

                    .wet {
                        width: 30px;
                        height: 110px;
                        line-height: 150px;
                        font-size: 10px;
                    }
                }

                .detail {
                    display: flex;
                    justify-content: space-around;

                    .wind {
                        display: flex;
                        height: 15px;

                    }

                    .air {
                        height: 15px;
                        display: flex;
                    }
                }

            }

            .after {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;

                .day {
                    display: flex;
                    width: 90px;
                    height: 85px;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 15px;
                    margin-left: 10px;
                    margin-right: 5px;
                    border-radius: 3px;
                    .wc_day {
                        font-size: 8px;
                    }
                }
            }
        }
    }
}</style>