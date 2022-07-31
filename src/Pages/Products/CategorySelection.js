import React from 'react';
import { MultiSelect } from "react-multi-select-component";

const CategorySelection = ({ data, setSelected, selected, setSelectedCate, selectedCate, setSelectedSub, selectedSub }) => {



    let datas = []
    let childrens = []
    let subChildren = [];
    for (let x of data) {

        datas.push({
            label: x.name,
            value: x._id,
            children: childrens,
        })

        for (let cx of x.category) {

            childrens.push({
                label: cx.name,
                value: cx.name,
                children: subChildren,
            }
            )
            for (let sx of cx.subCategory) {
                subChildren.push(
                    {
                        label: sx.name,
                        value: sx.name,
                    },
                )
            }
        }
    }

    //second category selection

    const secondCategory = data.filter(e => selected.map(x => x.label).includes(e.name));
    const secondFinalCategory = secondCategory.map(second => second.category)
    const obj = [];
    for (let s of secondFinalCategory) {
        obj.push(...s)
    }
    let secondCate = [];
    for (let xy of obj) {

        secondCate.push({
            label: xy.name,
            value: xy.name,
            slug: xy.slug,
        })
    }

    //3rd category selection
    const thirdCategory = obj.filter(e => selectedCate.map(x => x.label).includes(e.name));
    const thirdFinalCategory = thirdCategory.map(second => second.subCategory)
    const obj2 = [];
    for (let m of thirdFinalCategory) {
        obj2.push(...m)
    }
    let thirdCate = [];
    for (let xyz of obj2) {

        thirdCate.push({
            label: xyz.name,
            value: xyz.name,
            slug: xyz.slug,
        })
    }



    return (
        <div>
            <div>
                <h1 className='label-text font-semibold mb-2'>Main Category *</h1>
                {/* <pre>{JSON.stringify(selected)}</pre> */}
                <MultiSelect
                    className="select-primary border-primary border-[1px] rounded-lg w-full"
                    options={datas}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select Main Category"
                />
            </div>

            <div className='mt-2'>
                <h1 className='label-text font-semibold mb-2'>Category *</h1>
                {/* <pre>{JSON.stringify(selected)}</pre> */}
                <MultiSelect
                    className="select-primary border-primary border-[1px] rounded-lg w-full"
                    options={secondCate}
                    value={selectedCate}
                    onChange={setSelectedCate}
                    labelledBy="Select Main Category"
                />
            </div>

            <div className='mt-2'>
                <h1 className='label-text font-semibold mb-2'>Sub Category </h1>
                {/* <pre>{JSON.stringify(selected)}</pre> */}
                <MultiSelect
                    className="select-primary border-primary border-[1px] rounded-lg w-full"
                    options={thirdCate}
                    value={selectedSub}
                    onChange={setSelectedSub}
                    labelledBy="Select"
                />
            </div>
        </div>
    );
};

export default CategorySelection;