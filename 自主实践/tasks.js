const form = document.querySelector('#add-form');
const input = document.querySelector('#task-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#task-list');
const filters = document.querySelector('.filters');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let currentFilter = 'all';

const save = () => localStorage.setItem('tasks', JSON.stringify(tasks));

let doneChart = null;
const renderChart = () => {
  if (doneChart === null) {
    doneChart = echarts.init(document.querySelector('#done-chart'));
  }
  const done = tasks.filter(t => t.done).length;
  const active = tasks.length - done;
  doneChart.setOption({
    title: { text: '任务完成率', left: 'center' },
    tooltip: { trigger: 'item', formatter: '{b}: {c} 个 ({d}%)' },
    legend: { bottom: 0 },
    series: [{
      type: 'pie',
      radius: '60%',
      data: [
        { name: '已完成', value: done, itemStyle: { color: '#51cf66' } },
        { name: '未完成', value: active, itemStyle: { color: '#ff6b6b' } }
      ]
    }]
  });
};
window.addEventListener('resize', () => { if (doneChart) doneChart.resize(); });

const render = () => {
  list.innerHTML = '';
  const shown = tasks.filter(t =>
    currentFilter === 'all' ? true :
    currentFilter === 'active' ? !t.done : t.done
  );
  if (shown.length === 0) {
    const li = document.createElement('li');
    li.textContent = '没有符合条件的任务';
    list.appendChild(li);
  } else {
    shown.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.text;
      if (task.done) li.classList.add('done');
      li.addEventListener('click', () => {
        task.done = !task.done;
        save();
        render();
      });
      list.appendChild(li);
    });
  }
  renderChart();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === '') {
    tip.textContent = '任务名不能为空';
    return;
  }
  tasks.push({ text: text, done: false });
  save();
  tip.textContent = '';
  input.value = '';
  render();
});

filters.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  currentFilter = e.target.dataset.filter;
  render();
});

render();