import Airtable from 'airtable'

const base = new Airtable({apiKey: "patOnctnkl802BFlq.c57de8a152658f255a26e0ddadc8b13eb89fa4721ab2b8d4bd830e2e9e2add66"}).base("appRE0DxJYPgqD0Li")

async function fetchUser() {

    let user;

    try {
        const response = await base("Users").select({
            filterByFormula: `AND({email} = 'juan@gmail.com')`
        }).all();

        if (response.length > 0) {
            user = response[0].fields
        } else {
            throw new Error("This email does not exist")
        }
        console.log(user); // This will contain the actual user data
    } catch (error) {
        console.error(error); // Handle any errors
    }
}

fetchUser();
