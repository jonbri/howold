function Clock(props) {
  function Digit(props) {
    return React.createElement("span", {
      class: "digit digit" + props.number
    });
  }
  function Colon(props) {
    return React.createElement("span", {
      class: "colon"
    });
  }

  function getHours12(date) {
    return (date.getHours() + 24) % 12 || 12;
  }

  var now = new Date();

  function getCharArray(i) {
    return (i + "").split("");
  }

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  var aHours = getCharArray(pad(getHours12(new Date())));
  var aMinutes = getCharArray(pad(now.getMinutes()));
  var aSeconds = getCharArray(pad(now.getSeconds()));

  return React.createElement(
    "div",
    {
      class: "clock"
    },
    [
      React.createElement(Digit, { number: aHours[0] }, null),
      React.createElement(Digit, { number: aHours[1] }, null),
      React.createElement(Colon, {}, null),

      React.createElement(Digit, { number: aMinutes[0] }, null),
      React.createElement(Digit, { number: aMinutes[1] }, null),
      React.createElement(Colon, {}, null),

      React.createElement(Digit, { number: aSeconds[0] }, null),
      React.createElement(Digit, { number: aSeconds[1] }, null)
    ]
  );
}
window.Clock = Clock;
