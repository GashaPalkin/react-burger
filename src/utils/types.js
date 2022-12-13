import PropTypes from "prop-types"

export const ingredientType = {
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteings: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number

}

export const ingredientPropType = PropTypes.shape(ingredientType)

export const categoryType = {
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export const categoryPropType = PropTypes.shape(categoryType)

export const categoriesPropType = PropTypes.arrayOf(categoryPropType)
