//ques1
//Notifying Employee about Meeting
function Subject() {
    this.observers = [];

    this.registerObserver = function (observer) {
        if (this.observers.indexOf(observer) === -1) {
            this.observers.push(observer);
        }
    };

    this.unregisterObserver = function (observer) {
        var index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    };

    this.notifyObservers = function (message) {
        this.observers.forEach(function (observer) {
            observer.notify(message);
        });
    };
}
function Employee(name) {
    this.name = name;
    this.notify = function (meetingTime) {
        console.log(this.name + ': There is a meeting at ' + meetingTime);
    };
}

var archit = new Employee('Archit');
var rohit = new Employee('Rohit');
var meetingAlerts = new Subject();
meetingAlerts.registerObserver(archit);
meetingAlerts.registerObserver(rohit);
meetingAlerts.notifyObservers('10AM');