describe('This is a Unit Test Group', () => {
   describe('This is a Unit Test Subgroup', () => {
        test('This is the test function #1', () => {
            let hello = 0;
            const ExpectedCount = 1;

            hello = 1;

            expect(hello).toEqual(ExpectedCount);
        });
   }); 
});

describe('This is another Unit Test Group', () => {
    describe('This is a unit Test Subgroup in the other Unit Test Group', () => {
        test('This is a mock function test', () => {
            const mock = jest.fn(() => "bar");

            expect(mock(("foo"))).toBe("bar");
        })
    })
});