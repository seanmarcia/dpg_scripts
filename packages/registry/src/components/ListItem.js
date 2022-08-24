import React from 'react';
import { RegistryDescription } from './RegistryDescription.js';
import { RegistryLicense } from './RegistryLicense.js';
import { RegistryName } from './RegistryName.js';
import { RegistryPastYearOfActivity } from './RegistryPastYearOfActivity.js';

export function ListItem(nominee) {
    const item = nominee.item;
    const index = nominee.index;

    let itemClass = '';
    for (var j = 0; j < item.SDGs.length; j++) {
        itemClass += 'sdg' + item.SDGs[j].SDGNumber + ' '
    }

    for (var k = 0; k < item.type.length; k++) {
        itemClass += item.type[k] + ' ';
    }

    itemClass += item.stage;

    return (
        <tr key={index} className={itemClass}>
            <RegistryName item={item} />
            <RegistryDescription item={item} />
            <RegistryLicense item={item} />
            <RegistryPastYearOfActivity item={item} />
        </tr>
    )

}
