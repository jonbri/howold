var aData = window.aData;

// https://codepen.io/blackjacques/pen/RKPKba
String.prototype.singularize = function(num) {
  return (num == 1 ? this.slice(0, -1) : this);
};
Date.getFormattedDateDiff = function(date1, date2, intervals) {
  var b = moment(date1),
    a = moment(date2),
    intervals = intervals || ['years','months','weeks','days'],
    out = [];

  intervals.forEach(function(interval) {
    var diff = a.diff(b, interval);
    b.add(diff, interval);
    out.push(diff + ' ' + interval.singularize(diff));
  });
  return out.join(', ');
};

class Home extends React.Component {
    render() {
        var aDivs = [];
        aDivs.push(React.createElement('h3', null, moment().toString()));

        var aTrs = [];
        this.props.data
            .forEach(function(o) {
                aTrs.push(React.createElement('tr', null, [
                    React.createElement('td', null, o.name),
                    React.createElement('td', null, o.formattedAge)
                ]));
            });

        aDivs.push(React.createElement('table', {}, ...aTrs));
        return React.createElement('div', {}, ...aDivs)
    }
}

setInterval(function() {
  go();
}, 1000);
go();
function go() {
  aData = aData.map(function(o) {
      o.formattedAge = Date.getFormattedDateDiff(o.birthday, moment(new Date()));
      return o;
  });
  ReactDOM.render(
      React.createElement(Home, {data: aData}, null),
      document.getElementById('root')
  );
}
