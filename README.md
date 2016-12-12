# Share

> An Application for Hospice Care Management

#### Summary

The vision of Share is to create a transparent, simple, and reliable communication channel between end­-of-­life patient caregivers and hospice nurses. Currently, caregivers seeking medical attention for their patients must contact a triage (a middleman) who will figure out who to notify. On the other end, doctors don’t have a way to view immediate patient status unless they are notified. These doctors and nurses, who only have time to visit a patient 1­-2 times per week, do not have the bandwidth to manage an inefficient communications system. Share aims to automate this communications process to alleviate stress and save time for both caregivers and medical personnel.

#### Table of Contents
* [Team Structure](#Team Structure)
* [Features](#features)
* [Setup](#Setup)
* [User Documentation](./doc/Share User Documentation.docx)
* [Technical Documentation](./doc/Technical Docs/overview.md)

#### Team Structure
 - Aaron Liberatore: Development
 - Michael Lee: Product Management/Scrum
 - Daniel Song: Quality Assurance
 - Duke Cancer Institute Client Team:
	 - Jon Nicolla
	 - Arif Kamal
	 - Fred Friedman
     - Tisha Broyles

#### Features

The application features two sides. A side for the nurse application and for caregivers.

Nurses
1. Prioritizes patients based on their responses
2. Can call caregivers from inside the application
3. Notes feature for multiple nurses to communicate about patient
4. Can add new patients and modify caregivers

Caregivers
1. Can fill out daily assessments about their patient
2. Can view past assessments


#### Setup

###### Run Locally

1. Clone the repository
2. Open the project from the command line
3. Execute

    ```
        npm install
        react-native link
        react-native run-ios or react-native run-android
    ```
