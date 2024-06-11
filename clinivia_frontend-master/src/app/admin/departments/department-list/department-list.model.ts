import { formatDate } from '@angular/common';
export class DepartmentList {
  d_id: number;
  d_no: string;
  d_name: string;
  d_description: string;
  d_date: string;
  d_head: string;
  d_status: string;
  constructor(departmentList: DepartmentList) {
    {
      this.d_id = departmentList.d_id || this.getRandomID();
      this.d_no = departmentList.d_no || '';
      this.d_name = departmentList.d_name || '';
      this.d_description = departmentList.d_description || '';
      this.d_date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.d_head = departmentList.d_head || '';
      this.d_status = departmentList.d_status || 'Active';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
