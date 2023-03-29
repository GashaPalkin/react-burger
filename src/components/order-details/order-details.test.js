import renderer from 'react-test-renderer';
import { OrderDetails } from './order-details';

describe('Тест компонента OrderDetails', () => {
   it('Ордер рендерится без ошибок', () => {
      const tree = renderer
        .create(<OrderDetails orderNumber={112233} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    }); 
})
