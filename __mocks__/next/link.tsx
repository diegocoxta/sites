export default jest.fn().mockImplementation((props) => (
  <>
    <p>next/link</p>
    <a {...props} />
  </>
));
