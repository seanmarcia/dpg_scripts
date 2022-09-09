const filteredNominees = data.filter(nominee => {
  // {
  //   "id": "aam-digital",
  //   "name": "Aam Digital",
  //   "aliases": [
  //     ""
  //   ],
  //   "description": "Open source case management software for the social Sector. It provides an easy-to-use case management web app for NGOs anywhere in the world.",
  //   "website": "https://www.aam-digital.com",
  //   "license": [
  //     {
  //       "spdx": "GPL-3.0",
  //       "licenseURL": "https://github.com/Aam-Digital/ndb-core/blob/master/LICENSE.md"
  //     }
  //   ],
  //   "SDGs": [
  //     {
  //       "SDGNumber": 1,
  //       "evidenceText": "Aam Digital is used by social sector organizations that directly work with beneficiaries on the ground. It thereby contributes to the eradication of poverty."
  //     },
  //     {
  //       "SDGNumber": 3,
  //       "evidenceText": "Aam Digital is used in projects, with the objective of improving beneficiaries' health and thereby contributes to SDG 4."
  //     },
  //     {
  //       "SDGNumber": 4,
  //       "evidenceText": "Aam Digital is used in educational projects and thereby contributes to SDG 4."
  //     },
  //     {
  //       "SDGNumber": 5,
  //       "evidenceText": "Aam Digital can be used in projects with a focus on gender equity and thereby contribute to SGD 5."
  //     },
  //     {
  //       "SDGNumber": 10,
  //       "evidenceText": "As a tool for social sector organizations that work with marginalized communities, it contributes to SDG 10."
  //     }
  //   ],
  //   "sectors": [
  //     "Gender and Minority Groups"
  //   ],
  //   "type": [
  //     "software"
  //   ],
  //   "repositories": [
  //     {
  //       "name": "main",
  //       "url": "https://github.com/Aam-Digital/ndb-core"
  //     }
  //   ],
  //   "organizations": [
  //     {
  //       "name": "Aam Digital GmbH",
  //       "website": "https://www.aam-digital.com",
  //       "org_type": "maintainer",
  //       "contact_name": "Sebastian Leidig",
  //       "contact_email": "sebastian@aam-digital.com"
  //     }
  //   ],
  //   "stage": "DPG"
  // },

  const sdgChecked = [4];

  // const filteredArray = array1.filter(value => array2.includes(value));

  function passesSdg() {
    const nomineeSdgArray = nominee.SDGs.map(item => item.SDGNumber);
    // find if the arrays have any elements in common
    return sdgChecked.filter(value => nomineeSdgArray.includes(value)).length > 0;
  }

  return passesSdg;


})