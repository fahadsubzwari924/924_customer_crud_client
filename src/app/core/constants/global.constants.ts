export class GlobalConstants{
  public static readonly titles = {
    customer: {
      add: 'Create Customer',
      update: 'Update Customer'
    }
  }

  public static readonly mockData = {
    customerObj: {
      name: 'Test User',
      email: 'test@gmail.com',
      phone: '921324234',
      address: 'ghffds',
      age: 30
    }
  }

  public static readonly customerListHeaders = [
    { label: 'Name', value: 'name', isSort: true },
    { label: 'Email', value: 'email', isSort: false },
    { label: 'Age', value: 'age', isSort: false },
    { label: 'Phone', value: 'phone', isSort: false },
    { label: 'Address', value: 'address', isSort: false },
    { label: 'Date', value: 'createdAt', isSort: true },
  ];
}
