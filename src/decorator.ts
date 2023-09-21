function a() {
  console.log("a() evaluated");
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log("a() called");
  };
}

function b() {
  console.log("b() evaluated");
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let fn = descriptor.value;
    console.log("b() called");
    descriptor.value = () => {
      console.log("new method evaluated");
      //do something

      return fn.apply(this, arguments);
    };
  };
}

class C {
  @a()
  @b()
  method() {
    console.log("method evaluated");
  }
}

let c = new C();
c.method();
