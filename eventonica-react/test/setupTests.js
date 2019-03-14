// Inside src/setupTests.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Production Code
const helloWorld = ({ name }) => <div>Hello {name}!</div>
export default helloWorld;

// Test Code
describe('sum()', () => {
    it('renders without crashing', () => {
  		const welcome = shallow(<helloWorld name='Techtonica' />);
		expect(welcome.find('div').text()).toEqual('Techtonica');
});
});
