
function Assessment() {
  this.adjective = adjective;
  this.speak = function(line) {
    print("The ", this.adjective, " rabbit says '", line, "'");
  };
}

assessmentObject: {
    date: this.formatDate(new Date()),
    questions: {
        Pain: {
            value: 0,
            medicationChange: 'none'
        },
        Tiredness: {
            value: 1,
            medicationChange: 'none'
        },
        Nausea: {
            value: 2,
            medicationChange: 'none'
        },
        Depression: {
            value: 3,
            medicationChange: 'none'
        },
        Anxiety: {
            value: 4,
            medicationChange: 'none'
        },
        Drowsiness: {
            value: 5,
            medicationChange: 'none'
        },
        Appetite: {
            value: 6,
            medicationChange: 'none'
        },
        ShortnessOfBreath: {
            value: 7,
            medicationChange: 'none'
        },
        Caregiver: {
            value: 8
        }
    }
}
