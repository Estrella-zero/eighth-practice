const rooms= [
  { name : '楠苑一楼自习室' , floor : 1 , status : '开放' , seats : 120 , occupied : 86,building: '楠苑' },
  { name : '楠苑二楼自习室' , floor : 2 , status : '开放' , seats : 96 , occupied : 61,building: '楠苑' },
  { name : '楠苑三楼自习室' , floor : 3 , status : '开放' , seats : 48 , occupied : 48 ,building: '楠苑'},
  { name : '梓苑一楼自习室' , floor : 1 , status : '开放' , seats : 140 , occupied : 140 ,building: '梓苑'},
  { name : '梓苑二楼自习室' , floor : 2 , status : '维修' , seats : 88 , occupied : 0 ,building: '梓苑'},
  { name : '图书馆一楼自习区' , floor : 1 , status : '开放' , seats : 160 , occupied : 118,building: '图书馆' },
  { name : '图书馆二楼自习区' , floor : 2 , status : '开放' , seats : 130 , occupied : 130,building: '图书馆' },
  { name : '图书馆三楼静音室' , floor : 3 , status : '闭馆' , seats : 60 , occupied : 0 ,building: '图书馆'},
  { name : '理科楼一层通宵室' , floor : 1 , status : '开放' , seats : 80 , occupied : 41 ,building: '理科楼'},
  { name : '理科楼三层自习室' , floor : 3 , status : '闭馆' , seats : 72 , occupied : 0 ,building: '理科楼'},
  { name : '文科楼二层自习室' , floor : 2 , status : '开放' , seats : 66 , occupied : 52 ,building: '文科楼'},
  { name : '文科楼四层考研室' , floor : 4 , status : '开放' , seats : 110 , occupied : 103,building: '文科楼' } 
];

let currentFilter='all';

const list = document.querySelector('#room-list');
const filterFloor = document.querySelector('#filter-floor'); 
const statusFilters = document.querySelector('#status-filters');


const render=()=>{
    list.innerHTML = '';
    const floor=document.querySelector('#filter-floor').value;
   
    const shown = rooms.filter(r=>{
    const matchFloor= floor === ''|| r.floor=== Number(floor);
    let matchFilter;
    if(currentFilter === 'all'){
      matchFilter = true;
    } else if (currentFilter === 'open'){
      matchFilter = r.status === '开放';
    } else if (currentFilter === 'free'){
      matchFilter =(r.seats - r.occupied ) > 0 ;
    }
    return matchFloor&& matchFilter;
    });
    
    if (shown.length === 0) {
    const li = document.createElement('li');
    li.textContent = '没有符合条件的自习室';
    list.appendChild(li);
    renderCards([]);
    return;
    }

    shown.forEach(room => {
    const li = document.createElement('li');
    li.textContent = 
    `${room.name}   ${room.status}   剩余${room.seats - room.occupied}座`;
    list.appendChild(li);
    });

    renderCards(shown);
  };


const renderCards = (data) => {
  $('#cards').empty();
data.forEach(r => {
const free = r.seats- r.occupied;
$('#cards').append(`
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title h6">${r.name}</h3>
            <p class="card-text fs-4">${r.occupied}<span class="fs-6 text-muted"> / ${r.seats} 座</span></p>
            <p class="card-text small text-muted">剩余${free}的座位</p>
          </div>
        </div>
      </div>
    `);
  });
};

let barChart = null;
let byBuilding = {};

const renderBarChart = () => {
  if (barChart === null) {
    barChart = echarts.init(document.querySelector('#bar-chart'));

  barChart.on('click',function(params) { 
  if(params.componentType!=='series')return;
    var room = rooms.find(function ( r ) { 
      return r.name === params.name; 
  }); 
  if (!room) return ; 
  var idx = Object.keys(byBuilding). indexOf (room. building ); 
  pieChart.dispatchAction({ 
    type:'downplay', 
    seriesIndex:0 
  });  
  pieChart.dispatchAction({
    type:'highlight', 
    seriesIndex:0, 
    dataIndex:idx
  });

});
  }
  barChart.setOption({
    title: { text: '各自习室座位与在座人数', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0 },
    grid : { bottom: 90 },
    xAxis: { 
      type:'category',
      data:rooms.map(r =>r.name),
      axisLabel : { rotate:40, fontSize:10 }
    },
    yAxis: { name: '座' },
    series: [{
      name: '总座数',
      type: 'bar',
      data:rooms.map(r=>r.seats)
    },
    {
      name :'已坐座位数',
      type : 'bar' , 
      data : rooms.map( r =>r.occupied) 
    }]
  });
};

let pieChart = null;

const renderPieChart = () => { 
  if (pieChart === null ) {
    pieChart = echarts.init(document.querySelector('#pie-chart'));
  } 
  byBuilding = {};
  rooms.forEach( r => {
    byBuilding[r.building] = (byBuilding[r. building ] || 0 ) + r.seats ;
  });
  pieChart. setOption ({ 
    title:{ text:'各楼馆座位占比' , left:'center' }, 
    tooltip:{ trigger:'item' ,formatter:'{b}:{c}座({d}%)'}, 
    legend:{ bottom:0}, 
    series:[{
      type:'pie',
      radius: '60%', 
      data:Object.keys(byBuilding).map ( k => ({ 
        name:k, 
        value:byBuilding[k] }))
    }]
  });
};


filterFloor.addEventListener('change',render);
statusFilters.addEventListener('click',e=>{
    if(e.target.tagName !== 'BUTTON') return;
    currentFilter= e.target.dataset.filter;   
    render();
}
);

window.addEventListener('resize', () => {
  if (barChart) barChart.resize();
  if (pieChart) pieChart.resize();
});

$('#cards').on('click','.card',function( ){
  $(this).toggleClass('border-primary shadow');
});

renderPieChart();
renderBarChart();
render();