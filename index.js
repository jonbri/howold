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
        return React.createElement('div', {},
            this.createTimestamp(),
            this.createTable()
        );
    }
    createTimestamp() {
        return React.createElement('h3', null, "Today is " + moment().format("MMMM DD, YYYY") + ".");
    }
    createTable() {
        return React.createElement('table', {}, this.props.data
            .map(function(o) {
                return React.createElement('tr', null, [
                    React.createElement('td', null, o.name + ":"),
                    React.createElement('td', null, o.formattedAge)
                ]);
            }));
    }
}

function go() {
  aData = aData.map(function(o) {
      o.formattedAge = Date.getFormattedDateDiff(o.birthday, moment(new Date()));
      return o;
  });
  ReactDOM.render(
      React.createElement(Home, {data: aData}, null),
      document.getElementById('root')
  );
  // setTimeout(go, 1000);
}
go();
