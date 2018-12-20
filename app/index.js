// called for each member of window.aData
function transformData(o) {
  o.formattedAge = getFormattedDateDiff(o.birthday, moment(new Date()));
  return o;
}

// https://codepen.io/blackjacques/pen/RKPKba
function getFormattedDateDiff(date1, date2, intervals) {
  var b = moment(date1),
    a = moment(date2),
    out = [];
  intervals = intervals || ["years", "months", "weeks", "days"];
  function singularize(s, num) {
    return (num === 1 ? s.slice(0, -1) : s);
  };
  intervals.forEach(function(interval) {
    var diff = a.diff(b, interval);
    b.add(diff, interval);
    if (diff > 0) {
      out.push(diff + " " + singularize(interval, diff));
    }
  });
  return out.join(", ");
};

// top-level React control
function Home(props) {
  function createTimestamp() {
    return React.createElement("h3", null, "Today is " + moment().format("MMMM DD, YYYY") + ".");
  }
  function createTable(props) {
    return React.createElement("table", {}, props.data
      .map(function(o) {
        return React.createElement("tr", null, [
          React.createElement("td", null, o.name + " (" + o.birthday + "):"),
          React.createElement("td", null, o.formattedAge)
        ]);
      }));
  }
  return React.createElement("div", {},
    createTimestamp(),
    createTable(props)
  );
}

function go() {
  ReactDOM.render(
    React.createElement(Home, {
      data: window.aData.map(transformData)
    }, null),
    document.getElementById("root")
  );
  // setTimeout(go, 1000);
}
go();
