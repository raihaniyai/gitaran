/* eslint-disable import/prefer-default-export */
import { css } from '@emotion/css';

export const Container = css`
    display: grid;
    grid-template-columns: 20% auto;
`;

export const AddButton = css`
    z-index: 15;
    position: sticky;
    width: 100px;
    float: right;
    bottom: 50px;
    align-items: center;
    justify-content: center;
    font-size: 70%;
`;

export const ModalTitle = css`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
`;
