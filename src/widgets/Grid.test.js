import { render, screen } from '@testing-library/react';
import { createStore, StoreProvider } from 'easy-peasy';
import Grid from './Grid';

// Define a mock dataset to be used in the tests
const mockDataset = [
  {
    id: '1',
    width: 1000,
    height: 800,
    color: '#FFFFFF',
    alt_description: 'Mock image 1',
    urls: { small_s3: 'https://example.com/image1.jpg' },
  },
  {
    id: '2',
    width: 800,
    height: 600,
    color: '#000000',
    alt_description: 'Mock image 2',
    urls: { small_s3: 'https://example.com/image2.jpg' },
  },
];

// Define the store state for the test
    global.store = createStore({
        toggleSlider: { isOpen: false }
        });

describe('Grid component', () => {

    it('renders grid when empty data passed', () => {
        
        render(
            <StoreProvider store={global.store}>
                <Grid dataset={[]} />
            </StoreProvider>
            );

            const pictureWrapper = screen.getByTestId('picture-wrapper');
            expect(pictureWrapper).toBeInTheDocument();
            // there are multiple chidren because 'react-responsive-masonry' this package extra 3 contaiers into which images reflected.
            expect(pictureWrapper.children[0].children[0].children[0].children).toHaveLength(0);
        
    });

    it('renders images from the dataset', () => {
        render(
        <StoreProvider store={global.store}>
            <Grid dataset={mockDataset} />
        </StoreProvider>
        );

        // Check that both images are rendered
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);
    });

    it('opens the slider when an image is clicked', () => {
        const mockToggleSlider = jest.fn();
        global.store.getActions().toggleSlider = mockToggleSlider;

        render(
        <StoreProvider store={global.store}>
            <Grid dataset={mockDataset} />
        </StoreProvider>
        );

        const image = screen.getByAltText('Mock image 1');
        image.click();
        expect(mockToggleSlider).toHaveBeenCalledWith({
        selectedImage: mockDataset[0],
        isOpen: true,
        });
    });

});
