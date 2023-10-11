import { Injectable } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";

@Injectable({ providedIn: 'root'})
export class RoomOver18Validator{
    public onlyAccessRoomsOver18(minAge: number): ValidatorFn {

        return (formGroup: FormGroup)=> {
            const ageControl = formGroup.get('age'); // Age Control reference
            const roomControl = formGroup.get('room'); // Room control reference

            const ageValue = ageControl.value; // age value
            const roomsValue = roomControl.value; // room value

            if(ageValue >= minAge) {
                return null;
            }

            if(roomsValue === 'room-1' || roomsValue === 'room-2' || roomsValue === 'room-3') {
                return { roomOnlyWith18: true};
            }
            return null;
        };
    }
}