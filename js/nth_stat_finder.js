Array.prototype.swap = function(i, j) {
  'use strict';

  var tmp = this[i];
  this[i] = this[j];
  this[j] = tmp;

  return this;
}

function getNthStat(arr, n, k) {

  // http://e-maxx.ru/algo/kth_order_statistics

  'use strict';

  for (var l=1, r=n; ; )
  {
    
    if (r <= l+1)
    {
      // текущая часть состоит из 1 или 2 элементов -
      //   легко можем найти ответ
      if (r == l+1 && arr[r] < arr[l])
        arr.swap (l, r);
      return arr[k];
    }
    
    // упорядочиваем arr[l], arr[l+1], arr[r]
    var mid = (l + r) >> 1;
    arr.swap (mid, l+1);
    if (arr[l] > arr[r])
      arr.swap (l, r);
    if (arr[l+1] > arr[r])
      arr.swap (l+1, r);
    if (arr[l] > arr[l+1])
      arr.swap (l, l+1);
    
    // выполняем разделение
    // барьером является arr[l+1], т.е. медиана среди arr[l], arr[l+1], arr[r]
    var
      i = l+1,
      j = r;
    var
      cur = arr[l+1];
    for (;;)
    {
      while (arr[++i] < cur) ;
      while (arr[--j] > cur) ;
      if (i > j)
        break;
      arr.swap (i, j);
    }

    // вставляем барьер
    arr[l+1] = arr[j];
    arr[j] = cur;

    // продолжаем работать в той части,
    //   которая должна содержать искомый элемент
    if (j >= k)
      r = j-1;
    if (j <= k)
      l = i;

  }
}
