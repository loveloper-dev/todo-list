const TEST_URL = "http://localhost:8080";

describe("할 일 항목이 존재하지 않는다면", () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });

  it(`"✓ There are not to-do items. Please write your first to-do!" 메시지를 노출한다.`, () => {
    cy.get("#listSection .emptyset-wrapper .emptyset-content").should(
      "have.text",
      "✓ There are not to-do items. Please write your first to-do!",
    );
  });

  it(`단, 활성화된 필터가 All이 아니라면 "✓ There are not to-do items. Please use another filter." 메시지를 노출한다.`, () => {
    cy.get(".filter-wrapper button:nth-child(2)").trigger("click");
    cy.get("#listSection .emptyset-wrapper .emptyset-content").should(
      "have.text",
      "✓ There are not to-do items. Please use another filter.",
    );
  });

  it("완료되지 않은 할 일과 완료된 할 일의 개수가 모두 0으로 노출된다.", () => {
    cy.get("#statusSection .status-wrapper div")
      .first()
      .should("have.text", "☑️ 0");
    cy.get("#statusSection .status-wrapper div")
      .last()
      .should("have.text", "✅ 0");
  });
});

describe("할 일을 입력한 후 엔터키를 누르면", () => {
  const todo = "새로운 할 일";

  beforeEach(() => {
    cy.visit(TEST_URL);

    cy.get("#inputSection input")
      .type(`${todo}`)
      .trigger("keypress", { key: "Enter" });
  });

  it(`"✓ There are not to-do items. Please write your first to-do!" 메시지가 사라진다.`, () => {
    cy.get("#listSection .emptyset-wrapper .emptyset-content").should(
      "not.exist",
    );
  });

  it("입력한 항목이 할 일 목록에 노출된다.", () => {
    cy.get("#listSection li")
      .should("have.length", 1)
      .first()
      .should("have.text", todo);
  });

  it("할 일 항목의 완료하지 않은 갯수가 ☑️ 1로 노출된다", () => {
    cy.get("#statusSection .status-wrapper div")
      .first()
      .should("have.text", "☑️ 1");
  });
});

describe("할 일을 항목을 체크하면", () => {
  const todoList = ["1번 업무", "2번 업무", "3번 업무"];

  beforeEach(() => {
    cy.visit(TEST_URL);

    todoList.forEach((todo) => {
      cy.get("#inputSection input")
        .type(todo)
        .trigger("keypress", { key: "Enter" });
    });
  });

  it("완료된 항목은 목록의 맨 하단으로 이동된다.", () => {
    cy.get("#listSection li").first().trigger("click");

    cy.get("#listSection li")
      .last()
      .should("have.text", todoList[todoList.length - 1]);
  });

  it("완료된 항목을 체크 해제하여 완료되지 않은 항목으로 바꾸면 목록의 최상단으로 이동한다.", () => {
    cy.get("#listSection li").first().trigger("click");
    cy.get("#listSection li").last().trigger("click");

    cy.get("#listSection li")
      .first()
      .should("have.text", todoList[todoList.length - 1]);
  });

  it("완료된 항목 개수와 완료하지 않은 항목의 개수가 갱신된다.", () => {
    // 체크 X
    cy.get("#statusSection .status-wrapper div")
      .first()
      .should("have.text", "☑️ 3");
    cy.get("#statusSection .status-wrapper div")
      .last()
      .should("have.text", "✅ 0");

    // 체크 2건
    cy.get("#listSection li").first().trigger("click");
    cy.get("#listSection li").first().trigger("click");
    cy.get("#statusSection .status-wrapper div")
      .first()
      .should("have.text", "☑️ 1");
    cy.get("#statusSection .status-wrapper div")
      .last()
      .should("have.text", "✅ 2");
  });
});

describe("[Clear Completed] 버튼을 클릭하면", () => {
  const todoList = ["1번 업무", "2번 업무", "3번 업무"];

  beforeEach(() => {
    cy.visit(TEST_URL);

    todoList.forEach((todo) => {
      cy.get("#inputSection input")
        .type(todo)
        .trigger("keypress", { key: "Enter" });
    });

    cy.get("#listSection li").first().trigger("click");
    cy.get("#listSection li").first().trigger("click");

    cy.get("#statusSection button").last().trigger("click");
  });

  it("완료된 항목은 목록에서 제거된다.", () => {
    cy.get("#listSection li").first().should("have.length", 1);
  });

  it("완료된 항목 개수가 0으로 초기화 된다.", () => {
    cy.get("#statusSection .status-wrapper div")
      .last()
      .should("have.text", "✅ 0");
  });
});

describe("보기 타입 버튼 메뉴에서", () => {
  const todoList = ["1번 업무", "2번 업무", "3번 업무"];

  beforeEach(() => {
    cy.visit(TEST_URL);

    todoList.forEach((todo) => {
      cy.get("#inputSection input")
        .type(todo)
        .trigger("keypress", { key: "Enter" });
    });

    cy.get("#listSection li").first().trigger("click");
    cy.get("#listSection li").first().trigger("click");
  });

  it("[Active] 버튼을 클릭하면 완료되지 않은 목록만 노출한다.", () => {
    cy.get(".filter-wrapper button:nth-child(2)").trigger("click");
    cy.get("#listSection li").should("have.length", 1);
  });

  it("[Completeds] 버튼을 클릭하면 완료된 목록만 노출한다.", () => {
    cy.get(".filter-wrapper button:nth-child(3)").trigger("click");
    cy.get("#listSection li").should("have.length", 2);
  });

  it("버튼을 클릭할 때 마다 활성화된 버튼 색상이 변한다.", () => {
    cy.get(".filter-wrapper button:nth-child(2)").trigger("click");
    cy.get(".filter-wrapper button:nth-child(1)").should(
      "not.have.class",
      "active",
    );
    cy.get(".filter-wrapper button:nth-child(2)").should(
      "have.class",
      "active",
    );
    cy.get(".filter-wrapper button:nth-child(3)").should(
      "not.have.class",
      "active",
    );

    cy.get(".filter-wrapper button:nth-child(3)").trigger("click");
    cy.get(".filter-wrapper button:nth-child(1)").should(
      "not.have.class",
      "active",
    );
    cy.get(".filter-wrapper button:nth-child(2)").should(
      "not.have.class",
      "active",
    );
    cy.get(".filter-wrapper button:nth-child(3)").should(
      "have.class",
      "active",
    );
  });
});
