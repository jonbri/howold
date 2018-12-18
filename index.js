var aData = window.aData;

function getFormattedDateDiff(date1, date2, intervals) {
  // https://codepen.io/blackjacques/pen/RKPKba
  var b = moment(date1),
    a = moment(date2),
    intervals = intervals || ['years','months','weeks','days'],
    out = [];
  function singularize(s, num) {
    return (num == 1 ? s.slice(0, -1) : s);
  };
  intervals.forEach(function(interval) {
    var diff = a.diff(b, interval);
    b.add(diff, interval);
    out.push(diff + ' ' + singularize(interval, diff));
  });
  return out.join(', ');
};

function createTimestamp() {
  return React.createElement('h3', null, "Today is " + moment().format("MMMM DD, YYYY") + ".");
}
function createTable(props) {
  return React.createElement('table', {}, props.data
    .map(function(o) {
      return React.createElement('tr', null, [
        React.createElement('td', null, o.name + ":"),
        React.createElement('td', null, o.formattedAge)
      ]);
    }));
}
function Home(props) {
  return React.createElement('div', {},
    createTimestamp(),
    createTable(props)
  );
}

function go() {
  aData = aData.map(function(o) {
    o.formattedAge = getFormattedDateDiff(o.birthday, moment(new Date()));
    return o;
  });
  ReactDOM.render(
    React.createElement(Home, {data: aData}, null),
    document.getElementById('root')
  );
  // setTimeout(go, 1000);
}
go();
