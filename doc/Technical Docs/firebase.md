## Database

For this project, we used a firebase database located [here](https://console.firebase.google.com/project/reactcs408/database/data).

#### Transferring Firebase Database

1. From the home page, select the Gear Icon
2. Select `Permissions`
3. Select `ADD` to add a new member
4. Enter the new owner's email address
5. Set role to `Project -> Owner`

```
email: dukecancershareteam@gmail.com
password: dukecancer
```

#### Authorization

User are authenticated through the built in firebase [authentication system](https://firebase.google.com/docs/auth/). Since we have two kinds of users (Nurses and Caregivers), we authenticate all users first through the authentication system, then retrieve information on their user type by checking the additional information stored in the database itself. For example, if the returned uid is present in the Caregivers tree the user is a caregiver else the user is a nurse and their data is stored in the Nurse branch

#### Schema

Firebase is a NoSQL database that structures its data in a JSON format. As such data structure should be kept as flat as possible and it is often necessary to keep redundant data in order to improve scaling and simplify data access. Below is the minimal JSON tree showing our database's structure.

```javascript
{
    // Stores List of all registered caregivers
    "Caregivers" : {
        // Caregiver UID
        "2B8zpYs2tnYZueCDmFl3lOmCoux2" : {
            // Pointer to their nurse
            "Nurse" : "hRwGEHeZaYTGq6dFdWkn0q6P3Vl2",
            // Pointer to patient they are taking care of
            "Patient" : "1",
            "Profile" : {
                "name" : "Daniel Song",
                "phone" : "9198088115",
                "relation" : ""
            }
        }
    },
    // Stores List of all registered nurses
    "Nurses" : {
        //Nurse UID
        "hRwGEHeZaYTGq6dFdWkn0q6P3Vl2" : {
            // Membership list of all of the nurse's patients
            "Patients" : {
                "1" : true,
            },
            // Membership list of all of the nurse's patients that are critical
            "Critical Patients" : {
                "1480543591618" : true
            },
            // Membership list of all of the nurse's patients whose caregiver is distressed
            "Distressed Patients" : {
                "1480543591618" : true
            },

            "Profile" : {
                "hospital" : "Duke Medical Center",
                "name" : "User Tester - 1",
                "phone" : "831-319-3129",
                "picture" : "data:image/jpeg;base64,/"
            },
            // Pointer to organization the nurse belongs to
            "organization" : "0000"
        },
    }
    // Stores List of all registered organizations
    "Organizations" : {
        "0000" : {
            // Membership list of all of its nurses
            "Nurses" : {
                "hRwGEHeZaYTGq6dFdWkn0q6P3Vl2" : true
            },
            "name" : "Duke Hospital"
        }
    },
    // Stores List of all registered Patients
    "Patients" : {
        // Patient UID
        "1" : {
            "Assessments" : {
                "-KXyHqRL93A2d-3qJZeS" : {
                    // ESAS is the cumulative score of the values in an assessment's results
                    "ESAS" : 10,
                    "Results" : {
                        "Anxiety" : {
                            "medicationChange" : "none",
                            "value" : 10
                        },
                        "Appetite" : {
                            "medicationChange" : "none",
                            "value" : 0
                        },
                        "Caregiver" : {
                            "value" : 0
                        },
                        "Depression" : {
                            "medicationChange" : "none",
                            "value" : 0
                        },
                        "Drowsiness" : {
                            "medicationChange" : "none",
                            "value" : 0
                        },
                        "Nausea" : {
                            "medicationChange" : "none",
                            "value" : 0
                        },
                        "Pain" : {
                            "medicationChange" : "none",
                            "value" : 0
                        },
                        "Shortness Of Breath" : {
                            "medicationChange" : "none",
                            "value" : 0
                        },
                        "Tiredness" : {
                            "medicationChange" : "none",
                            "value" : 0
                        }
                    },
                    "comments" : "Sick",
                    // pointer to the caregiver the completed the form
                    "submittedBy" : "sD2AEvyjW9S2xuOY1yWPf7XkqUU2",
                    "timestamp" : 1480661351339
                },
            }
            // Membership List of all of this patient's caregivers
            "Caregivers" : {
                "sD2AEvyjW9S2xuOY1yWPf7XkqUU2" : true
            },
            // All Notes made by nurses about this patient
            "Notes" : {
                "-KVLch596Xar244sEAIb" : {
                    "pid" : "hRwGEHeZaYTGq6dFdWkn0q6P3Vl2",
                    "poster" : "John Mahony",
                    "text" : "Caregiver called frantically about the patient falling today",
                    "timestamp" : 1477848519143
                }
            },
            "active" : true, // is this patient active
            "caregiver distress" : false, // Are any of this patient's caregiver's distressed?
            "name" : "Homer Simpson",
            "nurse" : "hRwGEHeZaYTGq6dFdWkn0q6P3Vl2", // pointer to linked nurse
            "primary caregiver" : "sD2AEvyjW9S2xuOY1yWPf7XkqUU2", // pointer to linked primary caregiver
            "status" : 10 // current status out of 80 for this patient
        }
    }
}
```
