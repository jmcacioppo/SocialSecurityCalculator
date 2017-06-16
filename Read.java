import java.util.Scanner;

public class Read {
    public static void main(String[] args) {
        Scanner in = new Scanner(args);
        while(in.hasNext()) {
            System.out.printlnt(in.nextDouble() + ",");
        }
    }
}
