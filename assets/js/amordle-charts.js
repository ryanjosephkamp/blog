/*
 * Two charts for the Amordle article.
 *
 * Both are drawn from numbers exported out of the game — the Elo constants come
 * from the migration that actually settles ratings, and every continuation price
 * is evaluated by `continuationCost` itself. Nothing here restates a formula the
 * game owns; this file draws and labels, and that is all.
 *
 * They earn their place by answering questions prose answers badly: "why did
 * beating that player barely move my rating", and "how fast does a second guess
 * get expensive". Each has a text readout as well as a picture, so the answer
 * survives without the SVG.
 */
(function () {
  'use strict';

  var INK = 'currentColor';

  function svg(tag, attributes) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attributes || {}).forEach(function (key) {
      node.setAttribute(key, attributes[key]);
    });
    return node;
  }

  function expected(difference, scale) {
    return 1 / (1 + Math.pow(10, difference / scale));
  }

  /* Chart one: expected score against rating difference, with a draggable marker. */
  function ratingChart(root, rating) {
    var slider = root.querySelector('[data-rating-input]');
    var readout = root.querySelector('[data-rating-readout]');
    var plot = root.querySelector('[data-rating-plot]');
    if (!slider || !readout || !plot) return;

    var width = 560;
    var height = 220;
    var padX = 46;
    var padY = 22;
    var span = 600; // rating points either side

    var frame = svg('svg', {
      viewBox: '0 0 ' + width + ' ' + height,
      role: 'img',
      'aria-label':
        'Expected score against rating difference. The curve falls from near one when you far outrate your opponent to near zero when they far outrate you.',
    });
    frame.style.width = '100%';
    frame.style.height = 'auto';

    // Axes.
    frame.appendChild(
      svg('line', { x1: padX, y1: height - padY, x2: width - 8, y2: height - padY, stroke: INK, 'stroke-opacity': 0.35 }),
    );
    frame.appendChild(
      svg('line', { x1: padX, y1: padY, x2: padX, y2: height - padY, stroke: INK, 'stroke-opacity': 0.35 }),
    );

    var x = function (difference) {
      return padX + ((difference + span) / (span * 2)) * (width - padX - 8);
    };
    var y = function (score) {
      return height - padY - score * (height - padY * 2);
    };

    var path = '';
    for (var d = -span; d <= span; d += 10) {
      path += (path ? ' L' : 'M') + x(d).toFixed(1) + ' ' + y(expected(d, rating.scale)).toFixed(1);
    }
    frame.appendChild(svg('path', { d: path, fill: 'none', stroke: INK, 'stroke-width': 2 }));

    // The even-match reference: half a point, dead centre.
    frame.appendChild(
      svg('line', { x1: padX, y1: y(0.5), x2: width - 8, y2: y(0.5), stroke: INK, 'stroke-opacity': 0.2, 'stroke-dasharray': '4 4' }),
    );

    [
      { at: 0, label: '0' },
      { at: 1, label: '1' },
      { at: 0.5, label: '0.5' },
    ].forEach(function (tick) {
      var text = svg('text', { x: padX - 8, y: y(tick.at) + 4, 'text-anchor': 'end', fill: INK, 'font-size': 11, 'fill-opacity': 0.7 });
      text.textContent = tick.label;
      frame.appendChild(text);
    });

    [-400, 0, 400].forEach(function (tick) {
      var text = svg('text', { x: x(tick), y: height - padY + 15, 'text-anchor': 'middle', fill: INK, 'font-size': 11, 'fill-opacity': 0.7 });
      text.textContent = tick > 0 ? '+' + tick : String(tick);
      frame.appendChild(text);
    });

    var marker = svg('circle', { r: 5, fill: INK });
    frame.appendChild(marker);
    plot.appendChild(frame);

    function update() {
      var difference = Number(slider.value);
      var score = expected(difference, rating.scale);
      marker.setAttribute('cx', x(difference));
      marker.setAttribute('cy', y(score));

      var winStandard = Math.round(rating.standardK * (1 - score));
      var lossStandard = Math.round(rating.standardK * (0 - score));
      var winProvisional = Math.round(rating.provisionalK * (1 - score));

      readout.innerHTML = '';
      var lines = [
        'Opponent rated ' +
          (difference === 0 ? 'the same as you' : (difference > 0 ? difference + ' above you' : Math.abs(difference) + ' below you')) +
          '.',
        'You are expected to score ' + score.toFixed(2) + ' of 1.',
        'Win: ' + (winStandard >= 0 ? '+' : '') + winStandard + ' points. Lose: ' + lossStandard + ' points.',
        'While provisional, a win is worth ' + (winProvisional >= 0 ? '+' : '') + winProvisional + ' instead.',
      ];
      lines.forEach(function (line) {
        var p = document.createElement('p');
        p.textContent = line;
        readout.appendChild(p);
      });
    }

    slider.addEventListener('input', update);
    update();
  }

  /* Chart two: what a second guess costs, and how fast that rises. */
  function continuationChart(root, curve) {
    var plot = root.querySelector('[data-continuation-plot]');
    var table = root.querySelector('[data-continuation-table]');
    if (!plot || !curve || !curve.length) return;

    var width = 560;
    var height = 220;
    var padX = 42;
    var padY = 26;
    var maxCost = 0;
    var maxCount = 0;
    curve.forEach(function (series) {
      series.points.forEach(function (point) {
        if (point.cost > maxCost) maxCost = point.cost;
        if (point.continuationCount > maxCount) maxCount = point.continuationCount;
      });
    });

    var frame = svg('svg', {
      viewBox: '0 0 ' + width + ' ' + height,
      role: 'img',
      'aria-label':
        'Cost of each extra guess, rising linearly with the number already bought, and higher for longer words.',
    });
    frame.style.width = '100%';
    frame.style.height = 'auto';

    frame.appendChild(svg('line', { x1: padX, y1: height - padY, x2: width - 8, y2: height - padY, stroke: INK, 'stroke-opacity': 0.35 }));
    frame.appendChild(svg('line', { x1: padX, y1: padY, x2: padX, y2: height - padY, stroke: INK, 'stroke-opacity': 0.35 }));

    var x = function (count) {
      return padX + (count / maxCount) * (width - padX - 60);
    };
    var y = function (cost) {
      return height - padY - (cost / maxCost) * (height - padY * 2);
    };

    curve.forEach(function (series, index) {
      var path = '';
      series.points.forEach(function (point) {
        path += (path ? ' L' : 'M') + x(point.continuationCount).toFixed(1) + ' ' + y(point.cost).toFixed(1);
      });
      frame.appendChild(
        svg('path', {
          d: path,
          fill: 'none',
          stroke: INK,
          'stroke-width': 2,
          'stroke-opacity': 1 - index * 0.3,
          'stroke-dasharray': index === 0 ? '' : index === 1 ? '6 3' : '2 3',
        }),
      );
      var last = series.points[series.points.length - 1];
      var label = svg('text', { x: x(last.continuationCount) + 8, y: y(last.cost) + 4, fill: INK, 'font-size': 11, 'fill-opacity': 0.8 });
      label.textContent = series.wordLength + ' letters';
      frame.appendChild(label);
    });

    [0, maxCost].forEach(function (tick) {
      var text = svg('text', { x: padX - 8, y: y(tick) + 4, 'text-anchor': 'end', fill: INK, 'font-size': 11, 'fill-opacity': 0.7 });
      text.textContent = String(tick);
      frame.appendChild(text);
    });
    for (var count = 0; count <= maxCount; count += 1) {
      var text = svg('text', { x: x(count), y: height - padY + 15, 'text-anchor': 'middle', fill: INK, 'font-size': 11, 'fill-opacity': 0.7 });
      text.textContent = String(count + 1);
      frame.appendChild(text);
    }

    plot.appendChild(frame);

    if (table) {
      var rows = ['<tr><th scope="col">Extra guess</th>'];
      curve.forEach(function (series) {
        rows[0] += '<th scope="col">' + series.wordLength + ' letters</th>';
      });
      rows[0] += '</tr>';
      curve[0].points.forEach(function (point, index) {
        var row = '<tr><th scope="row">' + (index + 1) + '</th>';
        curve.forEach(function (series) {
          row += '<td>' + series.points[index].cost + '</td>';
        });
        rows.push(row + '</tr>');
      });
      table.innerHTML = rows.join('');
    }
  }

  /* Same inline-first rule as the figure player; see the note there. */
  function loadFigureData() {
    var inline = document.getElementById('amordle-figure-data');
    if (inline && inline.textContent.trim()) {
      try {
        return Promise.resolve(JSON.parse(inline.textContent));
      } catch (error) {
        /* Fall through to the network. */
      }
    }
    var source = document.querySelector('[data-figures-url]');
    if (!source) return Promise.reject(new Error('no figure data'));
    return fetch(source.getAttribute('data-figures-url')).then(function (response) {
      return response.json();
    });
  }

  function ready() {
    var ratingRoot = document.querySelector('[data-rating-chart]');
    var continuationRoot = document.querySelector('[data-continuation-chart]');
    if (!ratingRoot && !continuationRoot) return;

    loadFigureData()
      .then(function (data) {
        if (ratingRoot) ratingChart(ratingRoot, data.rating);
        if (continuationRoot) continuationChart(continuationRoot, data.continuationCurve);
      })
      .catch(function () {
        /* The surrounding prose stands on its own; a missing chart is not an error worth shouting about. */
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
})();
