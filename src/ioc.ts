import "reflect-metadata";

function Injectable(): ClassDecorator {
  return (target) => {};
}

@Injectable()
class C {
  echo() {
    console.log("c");
  }
}

@Injectable()
class B {
  constructor(private c: C) {}

  echo() {
    this.c.echo();
    console.log("b");
  }
}

@Injectable()
class A {
  constructor(private b: B) {}

  echo() {
    this.b.echo();
    console.log("a");
  }
}

const Factory = <T>(target: { new (...args: any): T }): T => {
  const deps = Reflect.getMetadata("design:paramtypes", target);

  const args = deps.map((cls) => {
    if (cls.length) {
      return Factory(cls);
    } else {
      return new cls();
    }
  });

  return new target(...args);
};

const a = Factory(A);
a.echo();
