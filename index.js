var aPeople = [
  {
    name: "Tracy",
    birthday: moment("1983-07-07")
  },
  {
    name: "Jonathan",
    birthday: moment("1985-08-12")
  },
  {
    name: "Austin",
    birthday: moment("2015-07-16")
  },
  {
    name: "Jason",
    birthday: moment("2017-05-08")
  }
];

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
        this.props.data
            .forEach(function(o) {
                aDivs.push(React.createElement('div', null, `${o.name}: ${o.formattedAge}`));
            });
        return React.createElement('div', {}, ...aDivs)
    }
}

setInterval(function() {
  go();
}, 1000);
go();
function go() {
  aPeople = aPeople.map(function(o) {
      o.formattedAge = Date.getFormattedDateDiff(o.birthday, moment(new Date()));
      return o;
  });
  ReactDOM.render(
      React.createElement(Home, {data: aPeople}, null),
      document.getElementById('root')
  );
}
