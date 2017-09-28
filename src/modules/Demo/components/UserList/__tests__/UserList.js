import * as React from "react";
import { shallow } from "enzyme";
import { UserListComponent } from "../index";


describe('UserList component', function () {

  const users = [
    { id: 1, name: 'Marc' },
    { id: 2, name: 'Ben' },
    { id: 3, name: 'Rand' },
    { id: 4, name: 'Michele' }
  ];

  beforeEach(() => {
    this.shallow = shallow(
      <UserListComponent users={users}/>
    );
    this.target = this.shallow.find("ul.user-list");
  });

  it("Initialization test", () => {
    expect(this.target).toBeDefined();
    expect(this.target.length).toBe(1);
  });

});
