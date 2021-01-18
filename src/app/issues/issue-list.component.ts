import { Component, OnInit, ViewChild } from '@angular/core';
import { Issue } from '../model/issue';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  isIssueFiltered = false;
  records: Issue[] = [];
  tempRecords: Issue[] = [];


  @ViewChild('csvReader') csvReader: any;

  constructor() { }

  ngOnInit() {
  }

  onFileUploadClick($event: any): void {
    $event.srcElement.value = '';
  }

  uploadListener($event: any): void {
    const files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const issuesArr = (<string>csvData).split(/\r\n|\n/);
        this.records = this.getDataRecordsArrayFromCSVFile(issuesArr);
        this.tempRecords = this.records;
        this.isIssueFiltered = false;
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(issuesArr: string[]) {
    const issues: Issue[] = [];

    if (issuesArr.length !== 0) {
      Array(issuesArr.length).fill(issuesArr.length, 1).map((_, i) => {
        const curruntRecord = (<string>issuesArr[i]).split(',');
        const issue: Issue = {
          firstName: curruntRecord[0].trim().replace(/^"(.*)"$/, '$1'),
          surName: curruntRecord[1].trim().replace(/^"(.*)"$/, '$1'),
          issueCount: +curruntRecord[2].trim().replace(/^"(.*)"$/, '$1'),
          dateOfBirth: new Date(curruntRecord[3].trim().replace(/^"(.*)"$/, '$1'))
        };
        issues.push(issue);
      });
    }
    return issues;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
    this.tempRecords = [];
    this.isIssueFiltered = false;
  }

  filterForMinimalIssue() {
    if (!this.isIssueFiltered) {

      let minimalIssueRecord: Map<number, Issue[]> = new Map();

      this.records.forEach(data => {
        if (minimalIssueRecord.size === 0) {
          minimalIssueRecord.set(data.issueCount, [data]);
        } else {
          const key: number = +minimalIssueRecord.keys().next().value;
          if (key > data.issueCount) {
            minimalIssueRecord = new Map();
            minimalIssueRecord.set(data.issueCount, [data]);
          } else if (key === data.issueCount) {
            minimalIssueRecord.get(key).push(data);
          }
        }
      });
      this.tempRecords = minimalIssueRecord.get(+minimalIssueRecord.keys().next().value);
      this.isIssueFiltered = true;
    } else {
      this.tempRecords = this.records;
      this.isIssueFiltered = false;
    }
  }


}
