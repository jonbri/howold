// called for each member of window.aData
function transformData(o) {
  o.formattedAge = getFormattedDateDiff(o.birthday, moment());
  var sBirthdayCurrentYear = o.birthday.replace(/^[\d]+/, (new Date()).getFullYear());
  var iBirthdayDayOfYear = getDayOfYear(sBirthdayCurrentYear);
  var iCurrentDayOfYear = getDayOfYear(moment());
  if (iBirthdayDayOfYear > iCurrentDayOfYear) { // birthday has not yet passed
    o.daysUntilBirthday = iBirthdayDayOfYear - iCurrentDayOfYear;
  } else {
    o.daysUntilBirthday = iBirthdayDayOfYear + (365 - iCurrentDayOfYear);
  }
  return o;
}

function getDayOfYear(m) {
  return parseInt(moment(m).format("DDD"));
}

// https://codepen.io/blackjacques/pen/RKPKba
function getFormattedDateDiff(date1, date2, intervals) {
  var b = moment(date1),
    a = moment(date2),
    out = [];
  intervals = intervals || ["years", "months"];
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
    function createHeaderRow() {
      return React.createElement("tr", null, [
        React.createElement("th", null, "Name"),
        React.createElement("th", null, "Birthday"),
        React.createElement("th", null, "Age"),
        React.createElement("th", null, "Days Until Birthday")
      ]);
    }
    function createRows() {
      return props.data
        .map(function(o) {
          return React.createElement("tr", null, [
            React.createElement("td", null, o.name),
            React.createElement("td", null, o.birthday),
            React.createElement("td", null, o.formattedAge),
            React.createElement("td", null, o.daysUntilBirthday)
          ]);
        });
    }
    return React.createElement("table", {}, [createHeaderRow()].concat(createRows()));
  }
  var checkbox = document.getElementById("twentyFourCheckBox") || { checked: false };
  return React.createElement("div", {},
    createTimestamp(),
    React.createElement(Clock, {
      twentyFour: checkbox.checked
    }, null),
    React.createElement(CheckBox, {
      onChange: go
    }, {}),
    createTable(props)
  );
}

function CheckBox(props) {
  return React.createElement("div", {}, [
    React.createElement("input", {
      id: "twentyFourCheckBox", type: "checkbox", onChange: props.onChange
    }),
    React.createElement("label", {
      for: "twentyFourCheckBox"
    }, "24?")
  ]);
}

function Digit(props) {
  return React.createElement("div", {
    class: "digit"
  }, [
    React.createElement("div", {}, "--" + props.number + "--"),
    React.createElement("div", {}, "--" + props.number + "--"),
    React.createElement("div", {}, "--" + props.number + "--")
  ]);
}

function Clock(props) {
  var now = new Date();
  function getHours() {
    if (props.twentyFour === true) {
      return now.getHours();
    }
    return "todo";
  }
  return React.createElement("div", {
    class: "clock"
  }, [
    React.createElement(Digit, { number: getHours() }, null),
    React.createElement(Digit, { number: now.getMinutes() }, null),
    React.createElement(Digit, { number: now.getSeconds() }, null),
  ]);
}

function go() {
  ReactDOM.render(
    React.createElement(Home, {
      data: window.aData.map(transformData),
      twentyFour: false
    }, null),
    document.getElementById("root")
  );
  setTimeout(go, 1000);
}
go();
