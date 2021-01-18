import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToIsoDatePipe'
})
export class ConvertToIsoDatePipe implements PipeTransform {

    static monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    transform(date: Date): string {
        return `${date.getDate()}-${ConvertToIsoDatePipe.monthNames[date.getMonth()]}-${date.getFullYear()}`;
    }

}
