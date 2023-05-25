const subwayline1=['堰桥','锡北运河','西漳','天一','刘潭','庄前','民丰','无锡火车站','胜利门','中转站',
'南禅寺','谈渡桥','太湖广场','清名桥','人民医院',
'华清大桥','扬名','南湖家园','塘铁桥','金医公园','市民中心','文化宫','江南大学','长广溪','雪浪','葛埭桥','南方泉']
const subwayline2=['梅园开原寺','荣巷','小桃源','河捋口','大王基','梁溪大桥','五爱广场','三阳广场','东林广场','上马墩','靖海',
    '广益','柏庄','东亭','庄桥','云林','九里河公园','查桥','映月湖公园','迎宾广场','无锡东站']
var  line1start={x:400,y:200}
var  line2start={x:200,y:380}
var  line3start={x:100,y:100}
var  line4start={x:100,y:100}
const mydata=[]
const target=[]
const drawNode=()=>{

}
target.push(
  {
        source: '胜利门',
        target: '南禅寺',
      },
  )
for(var i=0;i<subwayline1.length;i++)
{
    var position_x=line1start.x
    var position_y=line1start.y+20*i
    if(subwayline1[i]!='中转站')
    {
      mydata.push({name:subwayline1[i],x:position_x,y:position_y,itemStyle:{color:'red'},category: 0})
      
    }
    target.push(
      {
            source: subwayline1[i],
            target: subwayline1[i+1],
            lineStyle:{
              color:'green'
            }
          },
      ) 
}
for(var i=0;i<subwayline2.length;i++)
{
    var position_x=line2start.x+20*i
    var position_y=line2start.y
    mydata.push({name:subwayline2[i],x:position_x,y:position_y,itemStyle:{color:'green'},category: 1})
    target.push(
      {
            source: subwayline2[i],
            target: subwayline2[i+1],
          },
      ) 
    console.log(mydata)
}

const option = {
    title: {
      text: '无锡地铁'
    },
    legend: [{
      selectedMode: 'series',
      //设置可以根据类别显示or隐藏节点
      type:'plain',
      data:['1号线','2号线','3号线','4号线']}
    ],
 
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 15,
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        selectMode:true,
        roam: true,
        label: {
          show: true,
          color:'white'
        },
        scaleLimit:{max:6,min:3.5},
        edgeSymbol: ['circle'],
        edgeSymbolSize: 1,
        edgeLabel: {
          fontSize: 8
        },
        categories: [{name: "1号线",itemStyle:{color:'red'}}, {name: "2号线",itemStyle:{color:'#91cc75'}}, {name: "3号线"},{name: "4号线"},],
        data: mydata,
        links: target,
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0
        },
      }
    ]
  }
export {
    option
}