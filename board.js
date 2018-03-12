import * as Data from './raw_data/data.js';

const image_map = {
  'f': 'images/fire.png',
  'w': 'images/wood.png',
  'a': 'images/water.png',
  'l': 'images/light.png',
  'd': 'images/dark.png',
  'h': 'images/heart.png',
};

function _Render(element, board_layout) {
  element.empty();

  for (let i = 0; i < 30; i++) {
    const img = $('<img></img>');
    img.attr('src', image_map[board_layout[i]]);
    element.append(img);
    if (i % 6 == 5) {
      element.append($('<br/>'));
    }
  }
}

function _Flip(str) {
  let res = '';
  for (let i = 0; i < 30; i += 6) {
    for (let j = i + 5; j >= i; j--) {
      res += str[j];
    }
  }
  return res;
}

function _LoadBoard() {
  const c0 = $('input[name=c0]:checked').val();
  const c1 = $('input[name=c1]:checked').val();
  const c2 = $('input[name=c2]:checked').val();
  const key = $('#dataset').val();
  const n1 = $('#count1').val();
  const n2 = $('#count2').val();

  let layout = Data[key][n1][n2];
  layout = layout.replace(/0/g, c0).replace(/1/g, c1).replace(/5/g, c2);
  if ($('#flip').prop('checked')) {
    layout = _Flip(layout);
  }

  _Render($('#board'), layout);
}

function _LoadCount1List() {
  const container = $('#count1');
  container.empty();
  const key = $('#dataset').val();
  for (let i in Data[key]) {
    const option = $('<option></option>').attr('value', i).text(i);
    container.append(option);
  }
  container.change(_LoadCount2List);
  container.change();
}

function _LoadCount2List() {
  const container = $('#count2');
  container.empty();
  const key = $('#dataset').val();
  const n1 = $('#count1').val();
  for (let i in Data[key][n1]) {
    const option = $('<option></option>').attr('value', i).text(i);
    container.append(option);
  }
  container.change(_LoadCount3List);
  container.change();
}

function _LoadCount3List() {
  const container = $('#count3');
  container.empty();
  const n1 = $('#count1').val();
  const n2 = $('#count2').val();
  const n3 = 30 - n1 - n2;
  const option = $('<option></option>').attr('value', n3).text(n3);
  container.append(option);
  _LoadBoard();
}

function Init() {
  $('#board-options input[type=radio]').change(_LoadBoard);
  $('#flip').change(_LoadBoard);
  $('#dataset').change(_LoadCount1List);
  $('#dataset').change();
}

$(Init)
